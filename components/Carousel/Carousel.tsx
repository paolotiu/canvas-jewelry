import { useCallback, useEffect, useState } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import { OptionsType } from 'embla-carousel/vanilla/options';
import { useRecursiveTimeout } from '@utils/hooks/useRecursiveTimeout';
import { NextButton, PrevButton } from './CarouselButtons';
import DotButton from './DotButton/DotButton';
import DotButtonContainer from './DotButton/DotButtonContainer';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Embla = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`;
const EmblaContainer = styled.div`
  display: flex;
`;
const EmblaSlide = styled.div`
  position: relative;
  flex: 0 0 100%;
`;

interface Props {
  withButtons?: boolean;
  images: string[];
  withAutoPlay?: boolean;
  autoPlayInterval?: number;
}

const emblaConfig: Partial<OptionsType> = {
  // Allow carousel to loop photos
  loop: true,

  // Allow dragging
  draggable: true,

  // Don't allow to skip photos
  skipSnaps: false,
};
const Carousel = ({ withButtons, images, withAutoPlay, autoPlayInterval = 4000 }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaConfig);

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const autoPlay = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
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

      // Replay on release
      emblaApi.on('pointerUp', play);
    }
  }, [emblaApi, onSelect, images, withAutoPlay, play, stop]);

  return (
    <>
      <Wrapper>
        <Embla ref={emblaRef}>
          <EmblaContainer>
            {images?.map((src) => (
              <EmblaSlide key={src}>
                <img src={src} alt="" height="100%" width="100%" />
              </EmblaSlide>
            ))}
          </EmblaContainer>

          {scrollSnaps.length > 1 && (
            <DotButtonContainer>
              {scrollSnaps.map((_, i) => (
                <DotButton
                  key={uuid()}
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
    </>
  );
};
export default Carousel;
