import { ProductPriceVariants } from './sanity/queries';

export const getHasFromMap = (products: (ProductPriceVariants & { _id: string })[]) => {
  const map: Record<string, boolean> = {};

  // Check if each item has variants with different prices
  products.forEach((product) => {
    if (!product.variants) {
      map[product._id] = false;
      return;
    }
    map[product._id] = product.variants.some(
      (variant) => variant.price !== product.defaultVariant.price,
    );
  });
  return map;
};
