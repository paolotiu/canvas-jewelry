import Home from '@components/Home/Home';
import {
  CategoryWithProductsReturn,
  CATEGORY_BY_SLUG_QUERY,
  HomepageSettings,
  HOMEPAGE_SETTINGS_QUERY,
  ProductReturnWithPriceVariants,
} from '@utils/sanity/queries';
import { getClient } from '@utils/sanity/sanity.server';
import { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export const getStaticProps = async ({
  preview = false,
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<{
    products: ProductReturnWithPriceVariants[];
    homepageSettings: HomepageSettings;
    preview: boolean;
  }>
> => {
  const category = await getClient(preview).fetch<CategoryWithProductsReturn | undefined>(
    CATEGORY_BY_SLUG_QUERY,
    {
      slug: 'best-sellers',
    },
  );

  const homepageSettings = await getClient(preview).fetch<HomepageSettings | undefined>(
    HOMEPAGE_SETTINGS_QUERY,
  );

  if (!homepageSettings || !category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: category.products,
      homepageSettings,
      preview,
    },
  };
};
const IndexPage = ({
  products,
  homepageSettings,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Home products={products} homepageSettings={homepageSettings} />
);

export default IndexPage;
