import { GetStaticPaths, GetStaticProps } from 'next';
import Product from '@components/Product/Product';
import { getClient } from '@utils/sanity/sanity.server';
import { ALL_PRODUCTS_QUERY, ProductReturn, PRODUCT_BY_SLUG_QUERY } from '@utils/sanity/queries';
import { commerce, CommerceProduct, CommerceProductVariants } from '@utils/commerce/commerce';

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

  const info = await getClient(preview).fetch<ProductReturn>(PRODUCT_BY_SLUG_QUERY, {
    slug,
  });

  if (!info) {
    return {
      props: {},
      redirect: '/',
    };
  }

  const product = await commerce.products.retrieve(info.product.id || '');
  const variants = await commerce.products.getVariants(info.product.id || '', { limit: 300 });

  return {
    props: {
      product,
      info,
      preview,
      variants,
    },
  };
};

interface Props {
  product: CommerceProduct;
  info: ProductReturn;
  variants: CommerceProductVariants;
}

const ProductPage = ({ product, info, variants }: Props) => {
  return <Product product={product} info={info} variants={variants} />;
};

export default ProductPage;
