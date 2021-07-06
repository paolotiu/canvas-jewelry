import styled from '@emotion/styled';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

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
    cursor: pointer;

    :active {
      background-color: ${({ theme }) => theme.colors.blackAlpha[100]};
    }
  }
  input {
    width: 1.25rem;
    font-family: inherit;
    border: none;
    padding: 0.25rem 0;
    text-align: center;

    :focus {
      outline: none;
    }
  }

  input:read-only {
    cursor: default;
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

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onIncrement: () => void;
  onDecrement: () => void;
  quantity: number | string;
}

const QuantityInput = ({ quantity, onDecrement, onIncrement, ...props }: Props) => {
  return (
    <QuantityInputContainer>
      <button type="button" onClick={onDecrement}>
        <AiOutlineMinus />
      </button>
      <input type="number" value={quantity} {...props} />
      <button type="button" onClick={onIncrement}>
        <AiOutlinePlus />
      </button>
    </QuantityInputContainer>
  );
};

export default QuantityInput;
