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
  ProductReturnWithPriceVariants,
  ProductReturnWithVariants,
  PRODUCT_BY_SLUG_QUERY,
} from '@utils/sanity/queries';
import { urlFor, usePreviewSubscription } from '@utils/sanity/sanity';
import { useAtom } from 'jotai';
import { previewAtom } from '@utils/jotai';
import React, { useMemo, useEffect, useState } from 'react';
import ProductCarousel from '@components/ProductCarousel/ProductCarousel';
import { sanityClient } from '@utils/sanity/sanity.server';
import { NextSeo } from 'next-seo';
import ProductDetails from './ProductDetails';
import ProductOptions from './ProductOptions';

const ProductSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  position: relative;
  color: ${({ theme }) => theme.colors.headerText};
  width: 100%;

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
  display: flex;
  flex-direction: column;
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
    padding-bottom: 0;
  }

  ${breakpoints.lg} {
    padding: 0 3rem;
  }

  .button-container {
    padding: 1rem 0rem;
    line-height: 1.5em;
    button {
      width: 100%;
    }
    ${breakpoints.sm} {
      padding-bottom: 0;
      /* margin-top: auto; */
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .card-section {
    grid-column: 1 /-1;
    padding: 0 4rem;
    padding-top: 4rem;
  }
  .content {
    max-width: 1200px;
    width: 100%;
    padding: 1rem 0;
    padding-top: 0;
    margin: 0 0rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

    ${breakpoints.sm} {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 4rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .carousel-wrapper {
      grid-column: unset;
      ${breakpoints.sm} {
        max-width: 500px;
        max-height: unset;
      }
    }
  }
`;

const ProductCarouselWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface Props {
  product: ProductReturnWithVariants;
}

const Product = ({ product }: Props) => {
  const router = useRouter();
  const [isPreview] = useAtom(previewAtom);
  const [relatedProducts, setRelatedProducts] = useState<ProductReturnWithPriceVariants[]>([]);

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
    <Layout>
      <NextSeo
        titleTemplate="Canvas | %s"
        title={data.name}
        openGraph={{
          images: [
            {
              url: urlFor(product.mainImage).width(614).height(937).url() || product.mainImage.url,
              width: 614,
              height: 937,
            },

            {
              url: urlFor(product.mainImage).width(1200).height(630).url() || product.mainImage.url,
              width: 1200,
              height: 630,
            },
          ],
          type: 'Product',
        }}
      />
      <ProductSection>
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
              // objectFit="cover"
              options={{
                imageBuilder: (builder) =>
                  builder
                    .width(400 * 2.5)
                    .height(500 * 2.5)
                    .quality(100),
              }}
            />
            <DetailsContainer>
              <ProductDetails
                description={data.description}
                name={data.name}
                price={data.defaultVariant.price}
              />
              {allVariants.length ? (
                <div className="options">
                  <ProductOptions
                    defaultVariant={data.defaultVariant}
                    variants={allVariants}
                    optionsSwitch={data.optionsSwitch}
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
        <ProductCarouselWrapper>
          <ProductCarousel products={relatedProducts} />
        </ProductCarouselWrapper>
      </ProductSection>
    </Layout>
  );
};

export default Product;
