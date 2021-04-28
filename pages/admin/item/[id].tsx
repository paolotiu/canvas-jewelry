import EditItem from '@components/Admin/EditItem/EditItem';
import { ItemDocument } from '@models/Item';
import { getItemById, getOneItemFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

interface Props {
  id: string;
}

const ItemPage = ({ id }: Props) => {
  const { data, isLoading, refetch } = useQuery<{ item: ItemDocument }>(['item', id], () =>
    getItemById(id),
  );
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>hey</div>;
  return <EditItem item={data.item} refetch={refetch} />;
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
