import { ProductVariant } from '@utils/sanity/queries';
import { useEffect, useState } from 'react';
import { matches } from 'lodash';
import { useAtom } from 'jotai';
import { productVariantAtom } from '@utils/jotai';

const getMatchedProducts = (variants: ProductVariant[], options: Record<string, any>) => {
  const matcher = matches(options);
  const matchedVariants = variants.filter(matcher);
  return matchedVariants;
};

const getWhichProductWithSize = (
  variants: ProductVariant[],
  options: Record<string, any> & { size: number },
) => {
  const { size, ...optionsWithoutSize } = options;

  const products = getMatchedProducts(variants, optionsWithoutSize);

  return products.find((product) => {
    if (!product.maxSize || !product.minSize) {
      return false;
    }

    if (product.maxSize < size || product.minSize > size) {
      return false;
    }

    if (size % 1 !== 0 && !product.hasHalfSizes) {
      return false;
    }

    if (size % 1 === 0 && product.isAllHalfSizes) {
      return false;
    }
    return true;
  });
};

export const useWhichProduct = (initial: any = {}, variants: ProductVariant[]) => {
  const [currentConfig, setCurrentConfig] =
    useState<Record<string, boolean | string | number>>(initial);

  const [, setVariant] = useAtom(productVariantAtom);

  useEffect(() => {
    // Reset whenever item changes
    setCurrentConfig(initial);
  }, [initial]);

  useEffect(() => {
    if (typeof currentConfig.size === 'number') {
      const variation = getWhichProductWithSize(variants, currentConfig as any);
      setVariant(variation || null);
    } else {
      const variations = getMatchedProducts(variants, currentConfig);
      setVariant(variations[0]);
    }
  }, [currentConfig, setVariant, variants]);

  const handleSelectChange = (
    value: { label: string; value: string } | null,
    key: string,
    type: 'string' | 'number' = 'string',
  ) => {
    if (value) {
      if (type === 'number') {
        setCurrentConfig((prev) => ({ ...prev, [key]: Number(value.value) }));
      } else {
        setCurrentConfig((prev) => ({ ...prev, [key]: value.value }));
      }
    }
  };

  return { handleSelectChange, currentConfig };
};
