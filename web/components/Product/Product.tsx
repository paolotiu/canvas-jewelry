import styled from '@emotion/styled';
import Layout from '@components/Layout';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { useRouter } from 'next/router';
import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturnWithVariants, ProductVariant } from '@utils/sanity/queries';
import React from 'react';
import ProductOptions from './ProductOptions';
import { ProductContextProvider } from './ProductContext';
import ProductDetails from './ProductDetails';

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

const DetailsContainer = styled.div`
  padding-top: 1rem;
  padding: 1rem;
  .text {
  }

  .options {
    padding: 1rem 0;
    display: grid;
    gap: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  ${breakpoints.sm} {
    padding-top: 0;
  }

  .button-container {
    padding: 1rem 0rem;
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
    padding-top: 0;
    margin: 0 0rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

    ${breakpoints.sm} {
      padding-top: 4rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .carousel-wrapper {
      grid-column: unset;
      ${breakpoints.sm} {
        max-height: unset;
      }
    }
  }
`;

interface Props {
  product: ProductReturnWithVariants;
  allVariants: ProductVariant[];
}

const Product = ({ product, allVariants }: Props) => {
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
        <ProductContextProvider>
          <ContentContainer>
            <div className="content">
              <Carousel
                withButtons
                images={product.images}
                unsetAspectRatio
                options={{ imageBuilder: (builder) => builder.width(400 * 2).height(500 * 2) }}
              />
              <DetailsContainer>
                <ProductDetails
                  description={product.description}
                  name={product.name}
                  price={product.price}
                />
                {allVariants.length ? (
                  <div className="options">
                    <ProductOptions
                      variants={allVariants}
                      withSize={product.optionsSwitch?.withSize || false}
                    />
                  </div>
                ) : null}

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
              </DetailsContainer>
            </div>
          </ContentContainer>
        </ProductContextProvider>
      </main>
    </Layout>
  );
};

export default Product;
