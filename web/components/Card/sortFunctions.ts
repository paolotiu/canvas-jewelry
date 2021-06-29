import { ProductReturnWithPriceVariants } from '@utils/sanity/queries';
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

export const stringSort =
  (type: 'asc' | 'desc' = 'asc') =>
  (a: ProductReturnWithPriceVariants, b: ProductReturnWithPriceVariants) => {
    let result = 0;
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      result = 1;
    }

    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      result = -1;
    }

    if (type === 'desc') {
      return -result;
    }
    return result;
  };

export const priceSort =
  (type: 'asc' | 'desc' = 'asc') =>
  (a: ProductReturnWithPriceVariants, b: ProductReturnWithPriceVariants) => {
    let result = 0;
    if (a.defaultVariant.price > b.defaultVariant.price) {
      result = 1;
    }

    if (a.defaultVariant.price < b.defaultVariant.price) {
      result = -1;
    }

    if (type === 'desc') {
      return -result;
    }
    return result;
  };

export const sortModes = {
  priceAsc: {
    fn: priceSort('asc'),

    label: 'Price, low to high',
    icon: FaSortNumericDown,
  },
  priceDesc: {
    fn: priceSort('desc'),
    label: 'Price, high to low',
    icon: FaSortNumericUp,
  },
  stringAsc: {
    fn: stringSort('asc'),
    label: 'Alphabetically, A - Z',
    icon: FaSortAlphaUp,
  },
  stringDesc: {
    fn: stringSort('desc'),
    label: 'Alphabetically, Z - A',
    icon: FaSortAlphaDown,
  },
};

export type SortModes = keyof typeof sortModes;
