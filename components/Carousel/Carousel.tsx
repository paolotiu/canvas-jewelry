import { useCallback, useEffect, useState } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import { OptionsType } from 'embla-carousel/vanilla/options';
import { NextButton, PrevButton } from './CarouselButtons';
import DotButton from './DotButton/DotButton';
import DotButtonContainer from './DotButton/DotButtonContainer';

const Wrapper = styled.div`
  --max: 400px;
  width: 100%;
  display: flex;
`;

const Embla = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  max-height: var(--max);
  max-width: var(--max);
`;
const EmblaContainer = styled.div`
  display: flex;
`;
const EmblaSlide = styled.div`
  position: relative;
  flex: 0 0 100%;
  margin: 0.3rem;
`;

interface Props {
  withButtons?: boolean;
  images?: string[];
}

const emblaConfig: Partial<OptionsType> = {
  loop: true,
  draggable: true,
};
const Carousel = ({ withButtons = false, images }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaConfig);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit(emblaConfig);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect, images]);

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

          <DotButtonContainer>
            {scrollSnaps.map((_, i) => (
              <DotButton
                key={uuid()}
                onClick={() => emblaApi?.scrollTo(i)}
                active={i === activeIndex}
              />
            ))}
          </DotButtonContainer>

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
