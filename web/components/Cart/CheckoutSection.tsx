import Button from '@components/Common/Button/Button';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  price: number;
}

const CheckoutButtonContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1.2rem;
  display: grid;
  gap: 1rem;

  .shipping-disclaimer {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const CheckoutSection = ({ price }: Props) => {
  return (
    <CheckoutButtonContainer>
      <span className="shipping-disclaimer">Shipping calculated at checkout</span>
      <Button
        backgroundColor="black"
        color="white"
        style={{ width: '100%', padding: '1rem' }}
        size="md"
      >
        Checkout - {price}
      </Button>
    </CheckoutButtonContainer>
  );
};

export default CheckoutSection;
