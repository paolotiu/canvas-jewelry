import Overlay, { overlayVariants } from '@components/Common/Overlay/Overlay';
import styled from '@emotion/styled';
import { usePreventScroll } from '@utils/hooks/usePreventScroll';
import { motion, Variants } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import React from 'react';
import CartContent from './CartContent';

const StyledCart = styled(motion.aside)`
  width: calc(100vw - 65px);
  height: 100%;
  position: fixed;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  z-index: 10;
  right: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  h3 {
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`;

interface Props {
  isOpen: boolean;
  closeCart: () => void;
}

const variants: Variants = {
  hidden: {
    x: `100%`,

    transition: {
      ease: 'easeInOut',
    },
  },
  shown: {
    x: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};

const Cart = React.memo(
  ({ isOpen, closeCart }: Props) => {
    usePreventScroll(isOpen);
    return (
      <>
        <StyledCart initial="hidden" variants={variants} animate={isOpen ? 'shown' : 'hidden'}>
          <Header>
            <h3> Cart</h3>
            <FiX onClick={closeCart} size="22px" strokeWidth="1" />
          </Header>

          <CartContent />
        </StyledCart>
        <Overlay
          onClick={closeCart}
          initial="hidden"
          variants={overlayVariants}
          animate={isOpen ? 'shown' : 'hidden'}
        />
      </>
    );
  },
  (prev, next) => {
    return prev.isOpen === next.isOpen;
  },
);

export default Cart;
