import styled from '@emotion/styled';
import Image from 'next/image';
import { LineItem } from '@chec/commerce.js/types/line-item';
import { commerce } from '@utils/commerce/commerce';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import QuantityInput from '../Common/QuantityInput/QuantityInput';
import { useCart } from './useCart';

interface Props {
  item: LineItem;
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
  const [, { setCart, handleItemRemove, handleQuantityChange, triggerFetching }] = useCart(item.id);

  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);

  const { current: debouncedQuantityChange } = useRef(
    debounce(async (q: number, shouldRemove?: boolean) => {
      triggerFetching();

      if (shouldRemove) {
        await handleItemRemove();
        return;
      }

      handleQuantityChange(item.id, q);
    }, 500),
  );

  const handleDecrement = () => {
    setCurrentQuantity((prev) => {
      const val = Math.max(1, prev - 1);
      debouncedQuantityChange(val, prev - 1 <= 0);
      return val;
    });
  };

  const handleIncrement = () => {
    setCurrentQuantity((prev) => {
      const val = Math.min(9, prev + 1);
      debouncedQuantityChange(val);
      return val;
    });
  };

  // For quantity updates coming from outside the cart sidebar
  useEffect(() => {
    setCurrentQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <Container>
      <ImageContainer>
        {item.media?.source ? <Image width={90} height={130} src={item.media.source} /> : null}
      </ImageContainer>

      <Info>
        <h4>{item.name}</h4>
        <AttributesContainer>
          {(item as any).selected_options.map((val: any) => (
            <p key={val.option_id} className="attribute">
              {val.group_name === 'Size' ? 'size' : null} {val.option_name}
            </p>
          ))}

          <p className="attribute">{item.price.formatted_with_symbol}</p>
        </AttributesContainer>
        <ActionsContainer>
          <QuantityInput
            quantity={currentQuantity}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            readOnly
          />
          <button
            type="button"
            onClick={async () => {
              const res = await commerce.cart.remove(item.id);
              if (res.success) {
                setCart(res.cart);
              }
            }}
          >
            REMOVE
          </button>
        </ActionsContainer>
      </Info>
    </Container>
  );
};

export default CartItem;
