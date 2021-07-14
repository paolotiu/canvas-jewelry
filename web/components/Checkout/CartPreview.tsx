import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import React from 'react';
import PreviewItem from './PreviewItem';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  ${breakpoints.md} {
    max-width: 400px;
  }
`;

const PreviewItems = styled.div`
  > div {
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }
`;

const SummaryContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  display: grid;
  gap: 1rem;

  > div {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    display: flex;
    justify-content: space-between;

    .price {
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    }
  }
`;

const TotalContainer = styled.div`
  padding-top: 1rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  display: flex;
  justify-content: space-between;
`;

interface Props {
  checkout: CheckoutToken;
  shipping?: number;
}

const CartPreview = ({ checkout, shipping }: Props) => {
  const { subtotal } = checkout.live;
  return (
    <Container>
      <PreviewItems>
        {checkout.live.line_items.map((item) => (
          <PreviewItem key={item.id} item={item} />
        ))}
      </PreviewItems>
      <SummaryContainer>
        <div>
          <p>Subtotal</p>
          <p className="price">{subtotal.formatted_with_symbol}</p>
        </div>

        <div>
          <p>Shipping</p>
          <p className="price">{shipping ? '₱' + shipping : 'Waiting for region...'}</p>
        </div>
      </SummaryContainer>
      <TotalContainer>
        <p>Total</p>
        <p>₱{(shipping || 0) + subtotal.raw}</p>
      </TotalContainer>
    </Container>
  );
};

export default CartPreview;
