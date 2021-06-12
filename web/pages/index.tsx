import Home from '@components/Home/Home';
import { getItemsFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const IndexPage = () => <Home />;

export const getStaticProps: GetStaticProps = async () => {
  await connectDb();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('images', getItemsFromDb);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default IndexPage;
