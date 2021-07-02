import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.blackAlpha[300]};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 6;

  body {
    overflow: hidden;
  }
  ${breakpoints.lg} {
    display: none;
  }
`;

export default Overlay;
