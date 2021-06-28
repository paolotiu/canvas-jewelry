import { useEmblaCarousel } from 'embla-carousel/react';
import 'embla-carousel';
import Card from '@components/Card/Card';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn } from '@utils/sanity/queries';
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  max-width: 1200px;
  width: 100%;
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    padding-bottom: 0.2rem;
  }
`;
const Embla = styled.div`
  position: relative;
  overflow: hidden;
  /* padding: 2rem 0; */
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
  justify-content: center;
  flex: 0 0 40%;
  ${breakpoints.sm} {
    flex: 0 0 30%;
  }

  ${breakpoints.md} {
    flex: 0 0 20%;
  }

  :not(:last-child) {
    margin-left: 1rem;
    ${breakpoints.md} {
      margin-left: 1.2rem;
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

  useEffect(() => {
    // reinit to make dragging work
    if (products.length !== emblaApi?.containerNode.length) {
      emblaApi?.reInit();
    }
  }, [emblaApi, products.length]);

  return (
    <Container>
      <h2>Related Items</h2>
      <Embla ref={emblaRef}>
        <EmblaContainer>
          {products.map((product, i) => (
            <>
              {i > 11 ? null : (
                <EmblaSlide
                  key={product._id}
                  onClickCapture={(e) => {
                    // Prevent card from getting clicked while dragging
                    if (!emblaApi?.clickAllowed()) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {/* <div style={{ width: '100px', height: '100px', background: 'blue' }}></div> */}
                  <Card src={product.images[0]} name={product.name} slug={product.slug} />
                </EmblaSlide>
              )}
            </>
          ))}
        </EmblaContainer>
      </Embla>
    </Container>
  );
};

export default ProductCarousel;
