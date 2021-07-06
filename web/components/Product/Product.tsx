import styled from '@emotion/styled';
import Layout from '@components/Layout';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { FiLoader } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Carousel from '@components/Carousel/Carousel';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn, PRODUCT_BY_SLUG_QUERY } from '@utils/sanity/queries';
import { urlFor, usePreviewSubscription } from '@utils/sanity/sanity';
import { useAtom } from 'jotai';
import { cartAtom, isCartOpenAtom, previewAtom } from '@utils/jotai';
import React, { useState, useEffect, useMemo } from 'react';
import ProductCarousel from '@components/ProductCarousel/ProductCarousel';
import { NextSeo } from 'next-seo';
import Button from '@components/Common/Button/Button';
import { commerce, CommerceProduct, CommerceProductVariants } from '@utils/commerce/commerce';
import { useQuantity } from '@components/Common/QuantityInput/useQuantity';
import ProductDetails from './ProductDetails';
import ProductVariantPicker from './ProductVariantPicker';
import { ProductContentContainer } from './ProductContentContainer';
import { getPrice, getVariant } from './utils';

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
    display: grid;
    gap: 1rem;
    button {
      width: 100%;
    }
    ${breakpoints.sm} {
      padding-bottom: 0;
    }
  }
`;

const AddToCartButton = styled(Button)`
  :disabled {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.blackAlpha[300]};
  }
`;

const ProductCarouselWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface Props {
  info: ProductReturn;
  product: CommerceProduct;
  variants: CommerceProductVariants;
}

const Product = ({ info, product, variants }: Props) => {
  const router = useRouter();

  const [isPreview] = useAtom(previewAtom);

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Price
  const [currentPrice, setCurrentPrice] = useState(product.price.raw);

  // True when the current selected options isnt valid
  const [isError, setIsError] = useState(false);

  // Cart
  const [, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);

  // Options
  const initialOptions = variants.data?.[0].options || null;

  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const [currentQuantity, { increment, decrement }] = useQuantity(1, { max: 9, min: 1 });

  const handleSelectChange = (
    val: { label: string; value: string } | null,
    variantGroupId: string,
  ) => {
    if (val) {
      setSelectedOptions((prev) => ({ ...prev, [variantGroupId]: val.value }));
    }
  };

  // Reset options every time product changes
  useEffect(() => {
    setSelectedOptions(initialOptions);
  }, [initialOptions]);

  // Runs everytime selected options is different
  useEffect(() => {
    if (!variants.data) return;

    const variant = getVariant(selectedOptions, variants);

    if (variant) {
      const price = getPrice({
        variantGroups: product.variant_groups,
        basePrice: product.price.raw,
        selectedOptions,
      });
      setCurrentPrice(variant.price?.raw || price);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [product.price.raw, product.variant_groups, selectedOptions, variants]);

  // Related Products
  const relatedProducts = useMemo(() => {
    const map: Record<string, ProductReturn> = {};
    info.categories.forEach((category) => {
      category.products.forEach((prod) => {
        if (map[prod._id] || prod._id === info._id) {
          return;
        }

        map[prod._id] = prod;
      });
    });
    return Object.values(map);
  }, [info]);

  // For real time preview
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
        <ProductContentContainer>
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
                shouldShowError={isError}
              />

              <ProductVariantPicker
                quantity={currentQuantity}
                onIncrement={increment}
                onDecrement={decrement}
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
                <AddToCartButton
                  withBorder
                  fontWeight="bold"
                  size="sm"
                  style={{ padding: '1rem' }}
                  disabled={isError || isAddingToCart}
                  onClick={async () => {
                    setIsAddingToCart(true);
                    const variant = getVariant(selectedOptions, variants);
                    const res = await commerce.cart.add(product.id, currentQuantity, variant?.id);

                    if (res.success) {
                      setCart(res.cart);
                      setIsCartOpen(true);
                    }
                    setIsAddingToCart(false);
                  }}
                >
                  {isAddingToCart ? <FiLoader className="icon-spin" /> : 'Add to cart'}
                </AddToCartButton>
              </div>
            </DetailsContainer>
          </div>
        </ProductContentContainer>
        <ProductCarouselWrapper>
          <ProductCarousel products={relatedProducts} />
        </ProductCarouselWrapper>
      </ProductSection>
    </Layout>
  );
};

export default Product;
