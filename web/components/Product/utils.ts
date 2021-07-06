import { CommerceProductVariants, CommerceVariantGroups } from '@utils/commerce/commerce';
import { isEqual } from 'lodash';

export const getPrice = (x: {
  variantGroups: CommerceVariantGroups;
  basePrice: number;
  selectedOptions: Record<string, string>;
}) => {
  const { selectedOptions, variantGroups, basePrice } = x;
  const options = Object.entries(selectedOptions);

  return (
    basePrice +
    options.reduce((acc, [variantGroup, option]) => {
      const variantDetail = variantGroups.find((candidate) => candidate.id === variantGroup);

      if (!variantDetail) {
        return acc;
      }

      const optionDetail = variantDetail.options.find((candidate) => candidate.id === option);

      if (!optionDetail) {
        return acc;
      }

      return acc + optionDetail.price.raw;
    }, 0)
  );
};

export const getVariant = (
  selectedOptions: Record<string, string>,
  variants: CommerceProductVariants,
) => {
  if (!variants.data) return null;
  return variants.data.find((variant) => isEqual(variant.options, selectedOptions));
};
