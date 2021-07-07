import Button from '@components/Common/Button/Button';
import styled from '@emotion/styled';
import { isCartOpenAtom } from '@utils/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';

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

interface Props {
  label: string;
}
const CheckoutSection = ({ label }: Props) => {
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const router = useRouter();
  return (
    <CheckoutButtonContainer>
      <span className="shipping-disclaimer">Shipping calculated at checkout</span>
      <CheckoutButton
        backgroundColor="black"
        color="white"
        size="md"
        onClick={() => {
          setIsCartOpen(false);
          router.push('/checkout');
        }}
      >
        {label}
      </CheckoutButton>
    </CheckoutButtonContainer>
  );
};

export default CheckoutSection;
