import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { CartItem } from '@utils/jotai';
import { ProductVariant } from '@utils/sanity/queries';
import { Product } from 'schemaTypes';

interface TransformVariantToCartItemParams {
  variant: ProductVariant;
  name: string;
  id: string;
  optionsSwitch: Product['optionsSwitch'];
  image: SanityImageSource;
}
export const transformVariantToCartItem = ({
  name,
  optionsSwitch,
  variant: { color, price, size, letters, additional },
  id,
  image,
}: TransformVariantToCartItemParams): CartItem => {
  let configId = id;
  const attributes: CartItem['attributes'] = {};

  if (optionsSwitch.withColor && color) {
    attributes.color = color;
    configId += `-${color}`;
  }

  if (optionsSwitch.withSize && size) {
    attributes.size = size;
    configId += `-${size}`;
  }

  if (optionsSwitch.withLetters && letters) {
    attributes.letters = letters;
    configId += `-${letters}`;
  }

  if (optionsSwitch.withAdditional && additional) {
    attributes.additional = additional;
    configId += `-${additional}`;
  }

  return {
    name,
    price,
    quantity: 1,
    attributes,
    configId,
    image,
  };
};
