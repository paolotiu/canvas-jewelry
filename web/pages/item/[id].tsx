import { GetStaticPaths, GetStaticProps } from 'next';
import Product from '@components/Product/Product';
import { getClient } from '@utils/sanity/sanity.server';
import { ALL_PRODUCTS_QUERY, ProductReturn } from '@utils/sanity/queries';

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getClient(false).fetch<Pick<ProductReturn, '_id'>[]>(ALL_PRODUCTS_QUERY);
  const paths = products.map((product) => ({ params: { id: product._id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Record<string, unknown>, { id: string }> = async ({
  params,
  preview = false,
}) => {
  if (!params)
    return {
      props: {},
      redirect: '/',
    };
  const { id } = params;
  const product = await getClient(preview).getDocument(id);
  return {
    props: {
      id,
      product,
    },
  };
};

interface Props {
  product: ProductReturn;
}

const ProductPage = ({ product }: Props) => {
  return <Product product={product} />;
};

export default ProductPage;
