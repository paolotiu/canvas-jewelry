import React, { useCallback, useEffect, useState } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import styled from '@emotion/styled';
import { OptionsType } from 'embla-carousel/vanilla/options';
import { useRecursiveTimeout } from '@utils/hooks/useRecursiveTimeout';
import { breakpoints } from '@styles/breakpoints';
import SanityImage from '@components/SanityImage/SanityImage';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { UseNextSanityImageOptions } from 'next-sanity-image';
import { NextButton, PrevButton } from './CarouselButtons';
import DotButton from './DotButton/DotButton';
import DotButtonContainer from './DotButton/DotButtonContainer';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  grid-column: 1/ -1;
  grid-row: 1/ -1;
  ${breakpoints.sm} {
    grid-column: 1 / span 2;
    grid-row: 1 / -1;
  }
`;

const Embla = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const EmblaContainer = styled.div`
  display: flex;
  height: 100%;
`;

const EmblaSlide = styled.div<{ objectFit?: 'contain' | 'cover' }>`
  position: relative;
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  /* cursor: grab; */

  img {
    object-fit: ${({ objectFit }) => objectFit || 'contain'};
  }

  ${breakpoints.sm} {
    aspect-ratio: unset;
    max-height: 500px;
  }
  aspect-ratio: 1/1;

  // flex gap polyfill
  @supports not (aspect-ratio: 1 / 1) {
    ::before {
      float: left;
      padding-top: 100%;
      content: '';
    }

    ::after {
      display: block;
      content: '';
      clear: both;
    }
  }
`;

const emblaConfig: Partial<OptionsType> = {
  // Allow carousel to loop photos
  loop: true,

  // Allow dragging
  draggable: true,

  // Don't allow to skip photos
  skipSnaps: false,
};

interface Props {
  withButtons?: boolean;
  images: SanityImageSource[];
  withAutoPlay?: boolean;
  autoPlayInterval?: number;
  unsetAspectRatio?: boolean;
  options?: UseNextSanityImageOptions & {
    enableBlurUp?: true;
  };
  cover?: boolean;
  objectFit?: 'contain' | 'cover';
}

const Carousel = ({
  withButtons,
  images,
  withAutoPlay,
  autoPlayInterval = 4000,
  unsetAspectRatio,
  options,
  objectFit,
  cover,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaConfig);

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay function passed to useRecursiveTimeout
  const autoPlay = useCallback(() => {
    if (!emblaApi) return;

    if (emblaApi.canScrollNext()) {
      // If there is a next slide scroll to it
      emblaApi.scrollNext();
    } else {
      // If not go back to the first slide
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  const { play, stop } = useRecursiveTimeout(autoPlay, autoPlayInterval);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    // Set which index is active
    // For the button indicators
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (images.length !== emblaApi?.slideNodes.length) {
      emblaApi?.reInit();
    }
  }, [emblaApi, images]);
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    // When new image gets into view
    // Triggered by drag/arrow
    emblaApi.on('select', onSelect);

    if (withAutoPlay) {
      // Start playing
      play();

      // Stop autoplay when user is holding the slide
      emblaApi.on('pointerDown', stop);
    }
  }, [emblaApi, onSelect, images, withAutoPlay, play, stop]);
  return (
    <Wrapper className="carousel-wrapper">
      <Embla ref={emblaRef}>
        <EmblaContainer>
          {images?.map((src, i) => (
            <EmblaSlide
              objectFit={objectFit}
              key={(src as any)._ref || i}
              style={{
                aspectRatio: unsetAspectRatio ? 'unset' : '',
              }}
            >
              <SanityImage src={src} options={options} cover={cover} />
            </EmblaSlide>
          ))}
        </EmblaContainer>

        {scrollSnaps.length > 1 && (
          <DotButtonContainer>
            {scrollSnaps.map((_, i) => (
              <DotButton
                // Bad practice in general but shouldn't matter in this case
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                active={i === activeIndex}
              />
            ))}
          </DotButtonContainer>
        )}

        {withButtons && images && images.length > 1 && (
          <>
            <PrevButton onClick={() => emblaApi?.scrollPrev()} />
            <NextButton onClick={() => emblaApi?.scrollNext()} />
          </>
        )}
      </Embla>
    </Wrapper>
  );
};
export default Carousel;
