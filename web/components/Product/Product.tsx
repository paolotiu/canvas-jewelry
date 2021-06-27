import styled from '@emotion/styled';
import Layout from '@components/Layout';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { useRouter } from 'next/router';
import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import { breakpoints } from '@styles/breakpoints';
import {
  CategoryWithProductsReturn,
  CATEGORY_BY_SLUG_QUERY,
  ProductReturn,
  ProductReturnWithVariants,
  PRODUCT_BY_SLUG_QUERY,
} from '@utils/sanity/queries';
import { usePreviewSubscription } from '@utils/sanity/sanity';
import { useAtom } from 'jotai';
import { previewAtom } from '@utils/jotai';
import React, { useMemo, useEffect, useState } from 'react';
import ProductCarousel from '@components/ProductCarousel/ProductCarousel';
import { sanityClient } from '@utils/sanity/sanity.server';
import ProductDetails from './ProductDetails';
import ProductOptions from './ProductOptions';

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
}

const Product = ({ product }: Props) => {
  const router = useRouter();
  const [isPreview] = useAtom(previewAtom);
  const [relatedProducts, setRelatedProducts] = useState<ProductReturn[]>([]);

  useEffect(() => {
    sanityClient
      .fetch<CategoryWithProductsReturn>(CATEGORY_BY_SLUG_QUERY, { slug: 'best-sellers' })
      .then((res) => setRelatedProducts(res.products));
  }, []);

  const { data } = usePreviewSubscription(PRODUCT_BY_SLUG_QUERY, {
    params: { slug: product.slug },
    initialData: product,
    enabled: isPreview,
  });

  const allVariants = useMemo(() => {
    if (data.variants) {
      return [data.defaultVariant, ...data.variants];
    }
    return [data.defaultVariant];
  }, [data]);

  return (
    <Layout title={`Canvas | ${data.name}`}>
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
              images={data.images}
              unsetAspectRatio
              options={{ imageBuilder: (builder) => builder.width(400 * 2).height(500 * 2) }}
            />
            <DetailsContainer>
              <ProductDetails description={data.description} name={data.name} price={data.price} />
              {allVariants.length ? (
                <div className="options">
                  <ProductOptions
                    variants={allVariants}
                    withSize={data.optionsSwitch?.withSize || false}
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
        <ProductCarousel products={relatedProducts} />
      </main>
    </Layout>
  );
};

export default Product;
