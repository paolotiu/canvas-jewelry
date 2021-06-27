import { atom } from 'jotai';
import { ProductVariant } from './sanity/queries';

export const previewAtom = atom(false);
export const productVariantAtom = atom<ProductVariant | null>(null);
