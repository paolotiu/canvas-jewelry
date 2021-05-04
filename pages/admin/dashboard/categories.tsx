import CategoryDashboard from '@components/Admin/Dashboard/CategoryDashboard';
import { getCategoriesFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const CategoryDashboardPage = () => {
  return <CategoryDashboard />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDb();
  const queryClient = new QueryClient();
  queryClient.prefetchQuery('categories', getCategoriesFromDb);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default CategoryDashboardPage;
