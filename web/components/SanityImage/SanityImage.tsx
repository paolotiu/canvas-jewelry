import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from '@utils/sanity/sanity.server';
import { useNextSanityImage, UseNextSanityImageOptions } from 'next-sanity-image';
import Image from 'next/image';
import React from 'react';

interface Props {
  src: SanityImageSource;
  options?: UseNextSanityImageOptions & {
    enableBlurUp?: true;
  };
  cover?: boolean;
}

const SanityImage = ({ src, options, cover = false }: Props) => {
  const imageProps = useNextSanityImage(sanityClient, src, options);
  if (cover) {
    return <Image {...imageProps} layout="intrinsic" objectFit="cover" />;
  }

  return <Image {...imageProps} layout="intrinsic" />;
};

export default SanityImage;
