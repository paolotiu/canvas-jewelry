import Home from '@components/Home/Home';
import { getItemsFromDb } from '@utils/queries';
import { getAllProducts } from '@utils/queries/products';
import { connectDb } from '@utils/withMongoose';
import { InferGetStaticPropsType } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getStaticProps = async () => {
  await connectDb();
  const queryClient = new QueryClient();
  const products = await getAllProducts();

  await queryClient.prefetchQuery('images', getItemsFromDb);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      products,
    },
  };
};

const IndexPage = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Home products={products} />
);

export default IndexPage;
