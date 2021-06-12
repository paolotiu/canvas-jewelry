import { ItemData } from 'interfaces';
import { useEmblaCarousel } from 'embla-carousel/react';
import 'embla-carousel';
import Card from '@components/Card/Card';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';

interface Props {
  items: ItemData[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-top: 5rem;

  max-width: 100vw;
`;
const Embla = styled.div`
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
  &.is-draggable {
    cursor: grab;
  }
  h2 {
    padding-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.headerText};
  }
`;
const EmblaContainer = styled.div`
  display: flex;
`;
const EmblaSlide = styled.div`
  display: flex;
  flex: 0 0 40%;
  ${breakpoints.sm} {
    flex: 0 0 30%;
  }

  ${breakpoints.md} {
    flex: 0 0 20%;
  }

  :not(:last-child) {
    margin-right: 1rem;
    ${breakpoints.md} {
      margin-right: 2rem;
    }
  }
`;

const ItemCarousel = ({ items }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    draggable: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });

  return (
    <Container>
      <h2>Related Items</h2>
      <Embla ref={emblaRef}>
        <EmblaContainer>
          {items.map((item) => (
            <EmblaSlide
              key={item._id}
              onClickCapture={(e) => {
                // Prevent card from getting clicked while dragging
                if (!emblaApi?.clickAllowed()) {
                  e.stopPropagation();
                }
              }}
            >
              <Card src={item.images[0].url} itemId={item._id} name={item.name} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </Embla>
    </Container>
  );
};

export default ItemCarousel;
