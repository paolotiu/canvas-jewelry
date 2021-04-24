import EditItem from '@components/Admin/EditItem/EditItem';
import { ItemInterface } from '@models/Item';
import { getItemById, getOneItemFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

interface Props {
  id: string;
}

const ItemPage = ({ id }: Props) => {
  const { data, isLoading } = useQuery<{ item: ItemInterface }>(
    ['item', id],
    () => getItemById(id),
    { enabled: false },
  );
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>hey</div>;
  return <EditItem item={data.item} />;
};

export default ItemPage;
export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (ctx) => {
  await connectDb();
  const { params } = ctx;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['item', params?.id], () => getOneItemFromDb(params?.id || ''));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: params?.id,
    },
  };
};
