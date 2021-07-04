import sanityClient from 'part:@sanity/base/client';
import { nanoid } from 'nanoid';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

type VariantWithSize = {
  maxSize: number;
  minSize: number;
  hasHalfSizes: boolean;
  isAllHalfSizes: boolean;
};

// Taken from https://stackoverflow.com/a/49577331/14242400
const generateRange = (from: number, to: number, step: number) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

const createVariations = (variant: VariantWithSize) => {
  const range = generateRange(
    variant.minSize,
    variant.maxSize,
    variant.hasHalfSizes ? 0.5 : 1
  );

  const variants = range.map((num) => ({
    ...variant,
    size: num,
    id: nanoid(),
  }));
  return variants;
};
const expandSizes = (doc: {
  defaultVariant: VariantWithSize;
  variants: VariantWithSize[];
}) => {
  const first = createVariations(doc.defaultVariant);

  const second = doc.variants.reduce(
    (prev, curr) => [...prev, ...createVariations(curr)],
    []
  );

  return [...first, ...second];
};
const fetchDocuments = () =>
  client.fetch(
    `*[_type == 'product' && slug.current == 'fine-simple-ring'] {defaultVariant, optionsSwitch, variants, _rev, _id, }`
  );

const buildPatches = (docs) =>
  docs.map((doc) => {
    let allVariations = [doc.defaultVariant, ...(doc.variations || [])];

    if (doc.optionsSwitch.withSize) {
      allVariations = expandSizes(doc);
    }

    return {
      id: doc._id,
      patch: {
        set: {
          defaultVariant: allVariations.shift(),
          variants: allVariations,
        },
        // this will cause the transaction to fail if the documents has been
        // modified since it was fetched.
        ifRevisionID: doc._rev,
      },
    };
  });

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();

  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join('\n')
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
