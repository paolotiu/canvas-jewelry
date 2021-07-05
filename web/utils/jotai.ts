import { SortModes } from '@components/Card/sortFunctions';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CommerceProductVariant } from './commerce/commerce';

export const previewAtom = atom(false);
export const productVariantAtom = atom<CommerceProductVariant | null>(null);
export const sortModeAtom = atom<SortModes>('stringAsc');

export const priceRevealAtom = atomWithStorage('isPriceRevealed', false);

type PossibleAttribute = 'size' | 'color' | 'letters' | 'additional';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  attributes: { [key in PossibleAttribute]?: number | string };
  image: SanityImageSource;
  configId: string;
}

export const cartAtom = atomWithStorage<CartItem[]>('cart', []);
if (process.env.NODE_ENV !== 'production') {
  cartAtom.debugLabel = 'cart';
}
