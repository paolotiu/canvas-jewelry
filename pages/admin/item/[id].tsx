import EditItem from '@components/Admin/EditItem/EditItem';
import { ItemDocument } from '@models/Item';
import { getItemById, getOneItemFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

interface Props {
  id: string;
}

const ItemPage = ({ id }: Props) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery<{ item: ItemDocument }>(
    ['item', id],
    () => getItemById(id),
    {
      retry: false,
      onError: () => {
        // Item does not exist...go back
        router.push('/admin/dashboard/items');
      },
    },
  );

  if (isLoading || !data) return <div>Loading...</div>;

  return <EditItem item={data.item} refetch={refetch} />;
};

export default ItemPage;
export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (ctx) => {
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
  const { params } = ctx;

  // Prefetch query on the server
  const queryClient = new QueryClient();
  try {
    const data = await queryClient.fetchQuery(['item', params?.id], () =>
      getOneItemFromDb(params?.id || ''),
    );
    if (!data)
      return {
        redirect: {
          destination: '/admin/dashboard/items',
          permanent: false,
        },
      };
  } catch (e) {
    return {
      redirect: {
        destination: '/admin/dashboard/items',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: params?.id,
    },
  };
};
