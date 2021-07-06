import { Cart } from '@chec/commerce.js/types/cart';
import { SortModes } from '@components/Card/sortFunctions';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { commerce, CommerceProductVariant } from './commerce/commerce';

export const previewAtom = atom(false);
export const productVariantAtom = atom<CommerceProductVariant | null>(null);
export const sortModeAtom = atom<SortModes>('stringAsc');

export const priceRevealAtom = atomWithStorage('isPriceRevealed', false);

export const isCartOpenAtom = atom(false);

export interface CartItem extends CommerceProductVariant {
  image: SanityImageSource;
  name: string;
}

interface CartBase {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  data: null | Cart;
}
interface CartFetchingResult extends CartBase {
  isLoading: true;
  isError: false;
}

interface CartSuccessResult extends CartBase {
  isLoading: false;
  isError: false;
  data: Cart;
}

const cartResultAtom = atom<CartFetchingResult | CartSuccessResult>({
  isLoading: true,
  isError: false,
  isFetching: true,
  data: null,
});

export const cartAtom = atom(
  (get) => get(cartResultAtom),
  (_, set, updatedCart: Cart | undefined | 'fetch') => {
    if (updatedCart === 'fetch') {
      // Trigger fetching
      return set(cartResultAtom, (prev) => ({ ...prev, isFetching: true }));
    }

    if (updatedCart) {
      // Fetching done
      return set(cartResultAtom, (prev) => ({ ...prev, data: updatedCart, isFetching: false }));
    }

    set(cartResultAtom, (prev) => ({ ...prev, isFetching: true }));
    const getInitialCart = async () => {
      const cart = await commerce.cart.retrieve();
      set(cartResultAtom, { data: cart, isError: false, isFetching: false, isLoading: false });
    };

    getInitialCart();
  },
);
cartAtom.onMount = (update) => {
  update();
};
if (process.env.NODE_ENV !== 'production') {
  cartAtom.debugLabel = 'cart';
}
