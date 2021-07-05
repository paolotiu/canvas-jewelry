import styled from '@emotion/styled';
import Layout from '@components/Layout';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { useRouter } from 'next/router';
import Carousel from '@components/Carousel/Carousel';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn, PRODUCT_BY_SLUG_QUERY } from '@utils/sanity/queries';
import { urlFor, usePreviewSubscription } from '@utils/sanity/sanity';
import { useAtom } from 'jotai';
import { previewAtom } from '@utils/jotai';
import React, { useState, useEffect } from 'react';
// import ProductCarousel from '@components/ProductCarousel/ProductCarousel';
import { NextSeo } from 'next-seo';
import Button from '@components/Common/Button/Button';
import {
  CommerceProduct,
  CommerceProductVariants,
  CommerceVariantGroups,
} from '@utils/commerce/commerce';
import { isEqual } from 'lodash';
import ProductDetails from './ProductDetails';
import ProductVariantPicker from './ProductVariantPicker';

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

// const ProductCarouselWrapper = styled.div`
//   padding: 1rem;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

interface Props {
  info: ProductReturn;
  product: CommerceProduct;
  variants: CommerceProductVariants;
}

const getPrice = (x: {
  variantGroups: CommerceVariantGroups;
  basePrice: number;
  selectedOptions: Record<string, string>;
}) => {
  const { selectedOptions, variantGroups, basePrice } = x;
  const options = Object.entries(selectedOptions);

  return (
    basePrice +
    options.reduce((acc, [variantGroup, option]) => {
      const variantDetail = variantGroups.find((candidate) => candidate.id === variantGroup);

      if (!variantDetail) {
        return acc;
      }

      const optionDetail = variantDetail.options.find((candidate) => candidate.id === option);

      if (!optionDetail) {
        return acc;
      }

      return acc + optionDetail.price.raw;
    }, 0)
  );
};

const getVariant = (selectedOptions: Record<string, string>, variants: CommerceProductVariants) => {
  return variants.data.find((variant) => isEqual(variant.options, selectedOptions));
};

const Product = ({ info, product, variants }: Props) => {
  const router = useRouter();
  const [isPreview] = useAtom(previewAtom);
  const [currentPrice, setCurrentPrice] = useState(product.price.raw);
  const [shouldShowError, setShouldShowError] = useState(false);
  // const [currentVariant, setCurrentVariant] = useAtom(productVariantAtom);

  const initialOptions = variants.data[0].options;

  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleSelectChange = (
    val: { label: string; value: string } | null,
    variantGroupId: string,
  ) => {
    if (val) {
      setSelectedOptions((prev) => ({ ...prev, [variantGroupId]: val.value }));
    }
  };

  useEffect(() => {
    const variant = getVariant(selectedOptions, variants);
    if (variant) {
      const price = getPrice({
        variantGroups: product.variant_groups,
        basePrice: product.price.raw,
        selectedOptions,
      });
      setCurrentPrice(variant.price?.raw || price);
      setShouldShowError(false);
    } else {
      setShouldShowError(true);
    }
  }, [product.price.raw, product.variant_groups, selectedOptions, variants]);
  // const relatedProducts = useMemo(() => {
  //   const map: Record<string, ProductReturnWithPriceVariants> = {};
  //   info.categories.forEach((category) => {
  //     category.products.forEach((prod) => {
  //       if (map[prod._id] || prod._id === info._id) {
  //         return;
  //       }

  //       map[prod._id] = prod;
  //     });
  //   });
  //   return Object.values(map);
  // }, [info]);

  const { data } = usePreviewSubscription(PRODUCT_BY_SLUG_QUERY, {
    params: { slug: info.slug },
    initialData: info,
    enabled: isPreview,
  });

  return (
    <Layout>
      <NextSeo
        titleTemplate="Canvas | %s"
        title={data.product.name}
        openGraph={{
          images: [
            {
              url: urlFor(info.mainImage).width(614).height(937).url() || info.mainImage.url,
              width: 614,
              height: 937,
            },

            {
              url: urlFor(info.mainImage).width(1200).height(630).url() || info.mainImage.url,
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
              options={{
                imageBuilder: (builder) =>
                  builder
                    .width(400 * 2.5)
                    .height(500 * 2.5)
                    .quality(100),
              }}
              priority
            />
            <DetailsContainer>
              <ProductDetails
                description={data.description}
                name={data.product.name || ''}
                price={currentPrice}
                shouldShowError={shouldShowError}
              />
              <ProductVariantPicker
                handleSelectChange={handleSelectChange}
                defaultValues={initialOptions}
                variantGroups={product.variant_groups}
              />

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
                {/* <Button
                  withBorder
                  fontWeight="bold"
                  size="sm"
                  style={{ padding: '1rem' }}
                  onClick={() => {
                    if (currentVariant) {
                      const item = transformVariantToCartItem({
                        optionsSwitch: product.optionsSwitch,
                        name: product.name,
                        variant: currentVariant,
                        image: product.mainImage,
                      });

                      setCart((prev) => {
                        const clone = [...prev];
                        const matchedItem = clone.find((x) => x.configId === item.configId);
                        if (matchedItem) {
                          matchedItem.quantity += 1;
                        } else {
                          clone.push(item);
                        }

                        return clone;
                      });
                    }
                  }}
                >
                  Add to Cart
                </Button> */}
              </div>
            </DetailsContainer>
          </div>
        </ContentContainer>
        {/* <ProductCarouselWrapper>
          <ProductCarousel products={relatedProducts} />
        </ProductCarouselWrapper> */}
      </ProductSection>
    </Layout>
  );
};

export default Product;
