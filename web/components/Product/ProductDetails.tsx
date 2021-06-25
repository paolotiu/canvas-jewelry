import Divider from '@components/Divider/Divider';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import React from 'react';
import { SanityBlock } from 'sanity-codegen';
import { useProductContext } from './ProductContext';
import ProductDescription from './ProductDescription';

interface Props {
  name: string;
  description?: SanityBlock;
  price: number;
}

const StyledProductDetails = styled.div`
  padding-top: 1rem;
  line-height: 1.5em;
  display: grid;
  gap: 0.3rem;
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    ${breakpoints.sm} {
      font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    }

    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.4rem;
    align-items: center;
  }

  .description {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  .price {
    font-weight: ${({ theme }) => theme.typography.fontWeights.light};
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
  .warning {
    color: ${({ theme }) => theme.colors.danger};
    font-size: 0.8rem;
  }

  ${breakpoints.sm} {
    padding-top: 0;
  }
`;

const ProductDetails = ({ name, description, price }: Props) => {
  const { variant } = useProductContext();
  return (
    <StyledProductDetails>
      <div className="header">
        <h3>{name} </h3>

        <p className="price">{variant?.price || price}</p>
      </div>
      <Divider />

      <ProductDescription blocks={description} />

      <Divider />
      {/* {description && <p className="description">{description}</p>} */}
      <div>{!variant?.price && <span className="warning">Not a valid configuration</span>}</div>
    </StyledProductDetails>
  );
};

export default ProductDetails;
