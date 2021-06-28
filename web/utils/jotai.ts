import { atom } from 'jotai';
import { ProductVariant } from './sanity/queries';

const isSSR = typeof window === 'undefined';
export const previewAtom = atom(false);
export const productVariantAtom = atom<ProductVariant | null>(null);
export const priceRevealAtom = atom(
  isSSR ? false : JSON.parse(localStorage.getItem('isPriceRevealed') || 'false'),
);
