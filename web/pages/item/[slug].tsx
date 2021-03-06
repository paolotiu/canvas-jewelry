import { GetStaticPaths, GetStaticProps } from 'next';
import Product from '@components/Product/Product';
import { getClient } from '@utils/sanity/sanity.server';
import {
  ALL_PRODUCTS_QUERY,
  ProductReturn,
  ProductReturnWithCategories,
  ProductReturnWithVariants,
  PRODUCT_BY_SLUG_QUERY,
} from '@utils/sanity/queries';

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getClient(false).fetch<Pick<ProductReturn, '_id' | 'slug'>[]>(
    ALL_PRODUCTS_QUERY,
  );
  const paths = products.map((product) => ({ params: { slug: product.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Record<string, unknown>, { slug: string }> = async ({
  params,
  preview = false,
}) => {
  if (!params)
    return {
      props: {},
      redirect: '/',
    };
  const { slug } = params;
  const product = await getClient(preview).fetch<ProductReturnWithVariants>(PRODUCT_BY_SLUG_QUERY, {
    slug,
  });

  if (!product) {
    return {
      props: {},
      redirect: '/',
    };
  }

  return {
    props: {
      product,
      preview,
    },
  };
};

interface Props {
  product: ProductReturnWithVariants & ProductReturnWithCategories;
}

const ProductPage = ({ product }: Props) => {
  return <Product product={product} />;
};

export default ProductPage;
