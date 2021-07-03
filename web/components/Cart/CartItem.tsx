import styled from '@emotion/styled';
import { CartItem as CartItemType } from '@utils/jotai';
import React from 'react';
import SanityImage from '@components/SanityImage/SanityImage';
import QuantityInput from './QuantityInput';
import { useCart } from './useCart';

interface Props {
  item: CartItemType;
}

const Container = styled.div`
  :not(:first-of-type) {
    padding-top: 1rem;
  }
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-bottom: 1rem;
`;
const ImageContainer = styled.div`
  width: 90px;
  aspect-ratio: 90 / 130;
`;

const Info = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};

  h4 {
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`;

const AttributesContainer = styled.div`
  padding-top: 0.8rem;
  display: grid;
  gap: 0.5rem;

  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  .attribute {
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;

  .remove {
  }
`;

const CartItem = ({ item }: Props) => {
  const [, { removeFromCart }] = useCart();
  return (
    <Container>
      <ImageContainer>
        <SanityImage
          width={90}
          height={130}
          options={{ imageBuilder: (builder) => builder.width(180).height(260) }}
          src={item.image}
          responsive
        />
      </ImageContainer>

      <Info>
        <h4>{item.name}</h4>
        <AttributesContainer>
          {Object.entries(item.attributes).map(([key, val]) => (
            <p key={key} className="attribute">
              {key === 'size' ? 'size' : null} {val}
            </p>
          ))}

          <p className="attribute">₱{item.price}</p>
        </AttributesContainer>
        <ActionsContainer>
          <QuantityInput quantity={item.quantity} configId={item.configId} />
          <button type="button" onClick={() => removeFromCart(item.configId)}>
            REMOVE
          </button>
        </ActionsContainer>
      </Info>
    </Container>
  );
};

export default CartItem;
