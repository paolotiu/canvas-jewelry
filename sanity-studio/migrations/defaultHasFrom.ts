import sanityClient from 'part:@sanity/base/client';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

const fetchDocuments = () =>
  client.fetch(`*[_type == 'product'] {hasFrom, _rev, _id, }`);

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: {
        hasFrom: typeof doc.hasFrom === 'undefined' ? false : doc.hasFrom,
      },
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

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
