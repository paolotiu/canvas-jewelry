import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import React from 'react';
import { useProductContext } from './ProductContext';

interface Props {
  name: string;
  description?: string;
  price: number;
}

const StyledProductDetails = styled.div`
  padding: 1rem 0rem;
  line-height: 1.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  display: grid;
  gap: 0.3rem;
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
      <h3>{name} </h3>
      {description && <p className="description">{description}</p>}
      <div>
        <p className="price">{variant?.price || price}</p>
        {!variant?.price && <span className="warning">Not a valid configuration</span>}
      </div>
    </StyledProductDetails>
  );
};

export default ProductDetails;
