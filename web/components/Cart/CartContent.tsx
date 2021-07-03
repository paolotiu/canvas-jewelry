import styled from '@emotion/styled';
import { cartAtom } from '@utils/jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React from 'react';
import CartItem from './CartItem';
import CheckoutSection from './CheckoutSection';

const CartItemsContainer = styled(motion.div)``;

const CheckoutWrapper = styled.div`
  position: relative;
`;

const CartItemsWrapper = styled.div`
  padding: 1.2rem;
  overflow: auto;
  height: fit-content;
`;
const CheckoutContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
`;

const EmptyState = styled(motion.div)`
  /* grid-row: 2 /-1; */
  display: grid;
  place-items: center;
  letter-spacing: 0.2rem;

  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

const CartContent = () => {
  const [cartItems] = useAtom(cartAtom);
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {cartItems.length <= 0 ? (
          <EmptyState key="empty" initial={{ y: 10 }} animate={{ y: 0 }}>
            YOUR CART IS EMPTY
          </EmptyState>
        ) : (
          // eslint-disable-next-line react/jsx-fragments
          <React.Fragment key="items">
            <CartItemsWrapper>
              <CartItemsContainer
                exit={{ height: 0 }}
                transition={{ ease: 'easeOut', type: 'tween' }}
              >
                {cartItems.map((item) => (
                  <CartItem key={item.configId} item={item} />
                ))}
              </CartItemsContainer>
            </CartItemsWrapper>
            <CheckoutWrapper>
              <CheckoutContainer
                exit={{ height: 0 }}
                transition={{ ease: 'easeOut', type: 'tween' }}
              >
                <CheckoutSection
                  price={cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)}
                />
              </CheckoutContainer>
            </CheckoutWrapper>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartContent;
