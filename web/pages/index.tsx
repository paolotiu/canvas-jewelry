import Home from '@components/Home/Home';
import {
  CategoryWithProductsReturn,
  CATEGORY_BY_NAME_QUERY,
  ProductReturn,
  PRODUCT_BY_SLUG_QUERY,
} from '@utils/sanity/queries';
import { getClient } from '@utils/sanity/sanity.server';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const category = await getClient(preview).fetch<CategoryWithProductsReturn | undefined>(
    CATEGORY_BY_NAME_QUERY,
    {
      name: 'Test',
    },
  );

  const banners = await getClient(preview).fetch<ProductReturn | undefined>(PRODUCT_BY_SLUG_QUERY, {
    slug: 'banners',
  });

  return {
    props: {
      products: category?.products || [],
      banners,
    },
  };
};

const IndexPage = ({ products, banners }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Home
    products={products}
    banners={banners || { _id: 'asd', images: [], name: 'sadklsa', price: 100, slug: '10' }}
  />
);

export default IndexPage;
