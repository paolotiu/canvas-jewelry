import ItemDashboard from '@components/Admin/Dashboard/ItemDashboard';
import { getItemsFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const ItemDashboardPage = () => {
  return <ItemDashboard />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check if user is logged in and admin
  const session = await getSession(ctx);

  if (!session)
    // Not logged in...redirect
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };

  await connectDb();
  const queryClient = new QueryClient();
  queryClient.prefetchQuery('items', getItemsFromDb);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ItemDashboardPage;
