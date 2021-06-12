import AllDashboard from '@components/Admin/AllDashboard/AllDashboard';
import { getCategoriesFromDb, getItemsFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const index = () => {
  return <AllDashboard />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDb();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('items', getItemsFromDb);
  await queryClient.prefetchQuery('categories', getCategoriesFromDb);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default index;
