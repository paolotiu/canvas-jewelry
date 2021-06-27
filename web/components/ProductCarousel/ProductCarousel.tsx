import { useEmblaCarousel } from 'embla-carousel/react';
import 'embla-carousel';
import Card from '@components/Card/Card';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn } from '@utils/sanity/queries';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-top: 3rem;
  max-width: 100vw;
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
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

interface Props {
  products: ProductReturn[];
}

const ProductCarousel = ({ products }: Props) => {
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
          {products.map((product) => (
            <EmblaSlide
              key={product._id}
              onClickCapture={(e) => {
                // Prevent card from getting clicked while dragging
                if (!emblaApi?.clickAllowed()) {
                  e.stopPropagation();
                }
              }}
            >
              <Card src={product.images[0]} name={product.name} slug={product.slug} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </Embla>
    </Container>
  );
};

export default ProductCarousel;
