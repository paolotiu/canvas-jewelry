import { SortModes } from '@components/Card/sortFunctions';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { ProductVariant } from './sanity/queries';

export const previewAtom = atom(false);
export const productVariantAtom = atom<ProductVariant | null>(null);
export const sortModeAtom = atom<SortModes>('stringAsc');

export const priceRevealAtom = atomWithStorage('isPriceRevealed', false);
