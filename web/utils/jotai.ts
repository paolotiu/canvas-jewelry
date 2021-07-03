import { SortModes } from '@components/Card/sortFunctions';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { ProductVariant } from './sanity/queries';

export const previewAtom = atom(false);
export const productVariantAtom = atom<ProductVariant | null>(null);
export const sortModeAtom = atom<SortModes>('stringAsc');

export const priceRevealAtom = atomWithStorage('isPriceRevealed', false);

type PossibleAttribute = 'size' | 'color' | 'letters' | 'additional';
export interface CartItem {
  [x: string]: any;
  name: string;
  price: number;
  quantity: number;
  attributes: { [key in PossibleAttribute]?: number | string };
  configId: string;
  image: SanityImageSource;
}

export const cartAtom = atomWithStorage<CartItem[]>('cart', []);
