import Button from '@components/General/Button';
import Modal, { ModalProps } from '@components/Modal/Modal';
import styled from '@emotion/styled';
import { priceRevealAtom } from '@utils/jotai';
import { PricePassword, PRICE_PASSWORD_QUERY } from '@utils/sanity/queries';
import { sanityClient } from '@utils/sanity/sanity.server';
import { animate, useMotionValue } from 'framer-motion';
import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { FiLoader, FiCheck } from 'react-icons/fi';

const Container = styled.div`
  display: grid;
  gap: 0.8rem;
  padding: 2rem;
  width: 400px;
  max-width: 80vw;
  justify-items: center;
  text-align: center;
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    font-style: italic;
    font-weight: medium;
  }

  .success-text {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    font-weight: medium;
  }

  .subtext {
    font-style: italic;

    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.light};
  }
  button {
    margin-top: 0.4rem;
    width: 100%;
  }

  .spin {
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const StyledInput = styled.input`
  border: none;
  padding: 0.35rem 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};

  border-radius: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  width: 100%;
  outline: none;

  :focus-within {
    border-color: ${({ theme }) => theme.colors.coolGray['300']};
  }

  ::placeholder {
    text-align: center;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-weight: 300;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 0.3rem;
  text-align: left;

  .error {
    color: ${({ theme }) => theme.colors.danger};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`;
// TODO: Change implementation to use api routes later
const fetchPassword = () => sanityClient.fetch<PricePassword>(PRICE_PASSWORD_QUERY);

const PricePasswordModal = (props: Omit<ModalProps, 'children'>) => {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsPriceRevealed] = useAtom(priceRevealAtom);
  const strokeOffset = useMotionValue(-23);

  const onSubmit = async () => {
    setIsSubmitting(true);

    const res = await fetchPassword();

    if (res.password !== value) {
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsError(false);
    localStorage.setItem('isPriceRevealed', 'true');
    setIsPriceRevealed(true);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const check = document.querySelector<SVGSVGElement>('#password-modal-check');
      animate(strokeOffset, 0, {
        type: 'tween',
        onUpdate: (v) => {
          if (check) {
            check.style.strokeDashoffset = v.toString();
          }
        },
      });
    }
  }, [isSuccess, strokeOffset]);

  if (isSuccess) {
    return (
      <Modal {...props}>
        <Container>
          <FiCheck
            size="7rem"
            id="password-modal-check"
            strokeWidth={1}
            style={{ animationFillMode: 'forwards' }}
            strokeLinecap="square"
            strokeDasharray={23}
          />

          <h3 className="success-text">Successfully Revealed Prices </h3>
        </Container>
      </Modal>
    );
  }
  return (
    <Modal {...props}>
      <Container>
        <h4>Enter Password </h4>
        <p className="subtext">Enter the correct password to reveal the prices</p>
        <InputContainer>
          <StyledInput
            type="text"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {isError ? <p className="error"> Wrong password</p> : null}
        </InputContainer>

        <Button
          backgroundColor="black"
          isWhite
          size="md"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <FiLoader className="spin" /> : 'Submit'}
        </Button>
      </Container>
    </Modal>
  );
};

export default PricePasswordModal;
