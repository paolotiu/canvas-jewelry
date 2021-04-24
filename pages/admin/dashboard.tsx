import Dashboard from '@components/Admin/Dashboard/Dashboard';
import Item from '@models/Item';
import { cleanMongoData } from '@utils/cleanMongoData';
import { getItems } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const DashboardPage = () => {
  const { data } = useQuery('items', () => getItems());

  return <Dashboard items={data} />;
};

export default DashboardPage;

const getItemsFromDb = async () => {
  const res = await Item.find();
  return cleanMongoData(res);
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDb();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('items', () => getItemsFromDb());

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
