import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from '@utils/sanity/sanity.server';
import { useNextSanityImage, UseNextSanityImageOptions } from 'next-sanity-image';
import Image from 'next/image';
import React from 'react';

export interface SanityImageProps {
  src: SanityImageSource;
  options?: UseNextSanityImageOptions & {
    enableBlurUp?: true;
  };
  cover?: boolean;
}

const SanityImage = ({ src, options, cover = false }: SanityImageProps) => {
  const imageProps = useNextSanityImage(sanityClient, src, options);
  if (cover) {
    return (
      <Image
        src={imageProps.src}
        loader={imageProps.loader}
        alt="Jewelry"
        layout="fill"
        objectFit="cover"
      />
    );
  }

  return (
    <Image
      {...imageProps}
      layout="intrinsic"
      alt="Jewelry"
      // sizes="(max-width: 768px) 100vw, 1200px"
    />
  );
};

export default SanityImage;
