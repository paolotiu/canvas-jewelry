import styled from '@emotion/styled';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useCart } from './useCart';

const QuantityInputContainer = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: all 0.2s ease-in;
  button {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0.3rem;

    :active {
      background-color: ${({ theme }) => theme.colors.blackAlpha[100]};
    }
  }
  input {
    width: 20px;
    font-family: inherit;
    border: none;
    text-align: center;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
const QuantityInput = ({ quantity, configId }: { quantity: number; configId: string }) => {
  const [, { changeQuantity, setQuantity }] = useCart();

  return (
    <QuantityInputContainer>
      <button type="button" onClick={changeQuantity('subtract', configId)}>
        <AiOutlineMinus />
      </button>
      <input
        type="number"
        value={quantity}
        min={1}
        max={99}
        onChange={(e) => {
          const val = e.currentTarget.valueAsNumber;
          if (!val) return;

          if (val <= 0) {
            setQuantity(1, configId);
            return;
          }

          if (val >= 99) {
            setQuantity(99, configId);
            return;
          }

          setQuantity(val, configId);
        }}
      />
      <button type="button" onClick={changeQuantity('add', configId)}>
        <AiOutlinePlus />
      </button>
    </QuantityInputContainer>
  );
};

export default QuantityInput;
