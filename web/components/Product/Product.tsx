import styled from '@emotion/styled';
import Layout from '@components/Layout';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { useRouter } from 'next/router';
import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import { breakpoints } from '@styles/breakpoints';
// import ItemCarousel from '@components/ItemCarousel/ItemCarousel';
import { urlFor } from '@utils/queries/imageBuilder';
import { ProductExpanded } from '@utils/queries/products';

const InfoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  position: relative;
  color: ${({ theme }) => theme.colors.headerText};
  ${breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
  .back {
    cursor: pointer;
    position: absolute;
    left: 5%;
    padding: 0.4rem 0.4rem 0.2rem 0.2rem;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const TextContainer = styled.div`
  padding-top: 1rem;

  .text {
    padding: 1rem 0.7rem;
    line-height: 1.5em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    h3 {
      font-weight: ${({ theme }) => theme.typography.fontWeights.light};
      font-size: ${({ theme }) => theme.typography.fontSizes.xl};
      ${breakpoints.sm} {
        font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
      }
    }
    .description {
      color: ${({ theme }) => theme.colors.secondaryText};
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    }

    .price {
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
      font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    }
  }

  ${breakpoints.sm} {
    padding-top: 0;
    .text {
      padding-top: 0;
    }
  }

  .button-container {
    padding: 1rem 0.7rem;
    line-height: 1.5em;
    button {
      width: 100%;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .card-section {
    grid-column: 1 /-1;
    padding: 0 4rem;
    padding-top: 4rem;
  }
  .content {
    max-width: 1200px;
    padding: 1rem 0;
    margin: 0 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

    ${breakpoints.sm} {
      padding-top: 4rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .carousel-wrapper {
      grid-column: unset;
      max-height: 350px;
      ${breakpoints.sm} {
        max-height: unset;
      }
    }
  }
`;

interface Props {
  product: ProductExpanded;
}
const Product = ({ product }: Props) => {
  const router = useRouter();
  return (
    <Layout title={product.name}>
      <main>
        <InfoBlock>
          <button type="button" className="back" onClick={() => router.back()}>
            <ChevronLeft />
          </button>

          <h4>Product Details</h4>
        </InfoBlock>
        <ContentContainer>
          <div className="content">
            <Carousel
              withButtons
              images={product.images.map((img) => urlFor(img).url() || '')}
              unsetAspectRatio
            />
            <TextContainer>
              <div className="text">
                <h3>{product.name} </h3>
                <p className="description">{product.description}</p>
                <p className="price">{product.price}</p>
              </div>
              <div className="button-container">
                <a
                  href="https://www.instagram.com/thecanvasjewelry/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    backgroundColor="black"
                    isWhite
                    fontWeight="bold"
                    size="sm"
                    style={{ padding: '1rem' }}
                  >
                    Shop Now
                  </Button>
                </a>
              </div>
            </TextContainer>
          </div>

          {/* {data && <ItemCarousel items={data} />} */}
        </ContentContainer>
      </main>
    </Layout>
  );
};

export default Product;
