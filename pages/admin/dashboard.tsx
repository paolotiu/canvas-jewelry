import Dashboard from '@components/Dashboard/Dashboard';
import Item from '@models/Item';
import { cleanMongoData } from '@utils/cleanMongoData';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

const DashboardPage = ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Dashboard items={items} />
);

export default DashboardPage;
export const getServerSideProps: GetServerSideProps = async () => {
  await connectDb();
  const res = await Item.find({});
  const items = cleanMongoData(res);
  return {
    props: { items },
  };
};
