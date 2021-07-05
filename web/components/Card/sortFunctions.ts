import { ProductReturn } from '@utils/sanity/queries';
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

export const stringSort =
  (type: 'asc' | 'desc' = 'asc') =>
  (a: ProductReturn, b: ProductReturn) => {
    let result = 0;

    const aName = a.product?.name || '';
    const bName = b.product?.name || '';
    if (aName.toLowerCase() > bName.toLowerCase()) {
      result = 1;
    }

    if (aName.toLowerCase() < bName.toLowerCase()) {
      result = -1;
    }

    if (type === 'desc') {
      return -result;
    }
    return result;
  };

export const priceSort =
  (type: 'asc' | 'desc' = 'asc') =>
  (a: ProductReturn, b: ProductReturn) => {
    const aPrice = a.product.price?.raw || 0;
    const bPrice = b.product.price?.raw || 0;

    let result = 0;
    if (aPrice > bPrice) {
      result = 1;
    }

    if (aPrice < bPrice) {
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
    icon: FaSortAlphaDown,
  },
  stringDesc: {
    fn: stringSort('desc'),
    label: 'Alphabetically, Z - A',
    icon: FaSortAlphaUp,
  },
};

export type SortModes = keyof typeof sortModes;
