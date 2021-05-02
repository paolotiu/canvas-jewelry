import { getItemsFromDb, getOneItemFromDb } from '@utils/queries';
import { connectDb } from '@utils/withMongoose';
import { GetStaticPaths, GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Product from '@components/Product/Product';

interface Props {
  id: string;
}

const ProductPage = ({ id }: Props) => {
  return <Product id={id} />;
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDb();

  const items = await getItemsFromDb();
  const paths = items.map((item) => ({ params: { id: item._id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Record<string, unknown>, { id: string }> = async ({
  params,
}) => {
  if (!params)
    return {
      props: {},
      redirect: '/',
    };
  const { id } = params;
  await connectDb();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['item', id], () => getOneItemFromDb(id));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};
