import Home from '@components/Home/Home';
import { CategoryWithProductsReturn, CATEGORY_BY_NAME_QUERY } from '@utils/sanity/queries';
import { getClient } from '@utils/sanity/sanity.server';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const category = await getClient(preview).fetch<CategoryWithProductsReturn | undefined>(
    CATEGORY_BY_NAME_QUERY,
    {
      name: 'Test',
    },
  );

  return {
    props: {
      products: category?.products || [],
    },
  };
};

const IndexPage = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Home products={products} />
);

export default IndexPage;
