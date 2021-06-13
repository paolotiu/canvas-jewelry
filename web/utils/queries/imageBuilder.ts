import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from '@utils/sanityClient';

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (src: SanityImageSource) => {
  return builder.image(src);
};
