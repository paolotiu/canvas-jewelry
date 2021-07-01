import SanityImage, { SanityImageProps } from '@components/SanityImage/SanityImage';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface Props extends SanityImageProps {
  label: string;
  href: string;
  unsetGrid?: boolean;
}

const StyledBlock = styled(motion.div)<{ unsetGrid?: boolean }>`
  /* ${({ unsetGrid }) => (unsetGrid ? '' : `grid-column: 3 / -1;`)} */
  grid-row: 1 /-1;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  display: none;
  ${breakpoints.sm} {
    display: block;
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 1;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.blackAlpha['500']};
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeights.light};
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
`;

const BlockVariants: Variants = {
  rest: {
    opacity: 1,
  },
  hover: {
    opacity: 1,
  },
};
const OverlayVariants: Variants = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
    },
  },
};
const HomeBlock = ({ href, label, unsetGrid = false, ...props }: Props) => {
  return (
    <Link href={href} passHref>
      <StyledBlock initial="rest" whileHover="hover" variants={BlockVariants} unsetGrid={unsetGrid}>
        <>
          <Overlay variants={OverlayVariants}>{label}</Overlay>
          <SanityImage cover {...props} />
        </>
      </StyledBlock>
    </Link>
  );
};

export default HomeBlock;
