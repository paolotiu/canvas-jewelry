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
  const [cart] = useAtom(cartAtom);

  if (cart.isLoading) {
    return <div>loading....</div>;
  }

  const cartItems = cart.data.line_items;
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
                  <CartItem key={item.id} item={item} />
                ))}
              </CartItemsContainer>
            </CartItemsWrapper>
            <CheckoutWrapper>
              <CheckoutContainer
                exit={{ height: 0 }}
                transition={{ ease: 'easeOut', type: 'tween' }}
              >
                <CheckoutSection
                  label={
                    cart.isFetching
                      ? 'Calculating...'
                      : `Checkout - ${cart.data.subtotal.formatted_with_symbol}`
                  }
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
