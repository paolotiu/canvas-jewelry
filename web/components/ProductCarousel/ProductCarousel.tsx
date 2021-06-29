import { useEmblaCarousel } from 'embla-carousel/react';
import 'embla-carousel';
import Card from '@components/Card/Card';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturnWithPriceVariants } from '@utils/sanity/queries';
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  width: 100%;
  max-width: 1200px;

  ${breakpoints.lg} {
    width: calc(100vw - 300px);
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;
const Embla = styled.div`
  position: relative;
  overflow: hidden;
  padding: 2rem 0;

  overflow: hidden;

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
  flex: 0 0 40%;
  position: relative;
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
  products: ProductReturnWithPriceVariants[];
}

const ProductCarousel = ({ products }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    // reinit to make dragging work
    if (products.length !== emblaApi?.slideNodes().length) {
      emblaApi?.reInit();
    }
  }, [emblaApi, products.length]);

  return (
    <Container>
      <h2>Related Items</h2>
      <Embla ref={emblaRef}>
        <EmblaContainer>
          {products.map((product) => {
            return (
              <EmblaSlide
                key={product._id}
                onClickCapture={(e) => {
                  // Prevent card from getting clicked while dragging
                  if (!emblaApi?.clickAllowed()) {
                    e.stopPropagation();
                  }
                }}
              >
                <Card
                  src={product.images[0]}
                  name={product.name}
                  slug={product.slug}
                  price={product.defaultVariant.price}
                />
              </EmblaSlide>
            );
          })}
        </EmblaContainer>
      </Embla>
    </Container>
  );
};

export default ProductCarousel;
