import { GetStaticPaths, GetStaticProps } from 'next';
import Product from '@components/Product/Product';
import { getAllProducts, ProductExpanded } from '@utils/queries/products';
import { sanityClient } from '@utils/sanityClient';

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();
  const paths = products.map((product) => ({ params: { id: product._id } }));
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

  const product = await sanityClient.getDocument(id);
  return {
    props: {
      id,
      product,
    },
  };
};

interface Props {
  product: ProductExpanded;
}

const ProductPage = ({ product }: Props) => {
  return <Product product={product} />;
};

export default ProductPage;
