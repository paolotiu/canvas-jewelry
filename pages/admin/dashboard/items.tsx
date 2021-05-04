import ItemDashboard from '@components/Admin/Dashboard/ItemDashboard';
import { getItems, getItemsFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { ItemData } from 'interfaces';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const ItemDashboardPage = () => {
  const { data } = useQuery<ItemData[]>('items', () => getItems());

  return <ItemDashboard items={data} title="Items" />;
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
