import Button from '@components/Common/Button/Button';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  label: string;
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

const CheckoutButton = styled(Button)`
  width: 100%;
  padding: 1rem;
`;

const CheckoutSection = ({ label }: Props) => {
  return (
    <CheckoutButtonContainer>
      <span className="shipping-disclaimer">Shipping calculated at checkout</span>
      <CheckoutButton backgroundColor="black" color="white" size="md">
        {label}
      </CheckoutButton>
    </CheckoutButtonContainer>
  );
};

export default CheckoutSection;
