import ClientSideOnly from '@components/ClientSideOnly/ClientSideOnly';
import SanityImage from '@components/SanityImage/SanityImage';
import styled from '@emotion/styled';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { breakpoints } from '@styles/breakpoints';
import { useIsSSR } from '@utils/hooks/useIsSSR';
import { priceRevealAtom } from '@utils/jotai';
import { motion, Variants } from 'framer-motion';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';
import { ViewMode } from './CardView';

const StyledCard = styled(motion.div)`
  // To prevent css animation artifacts
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .image {
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    overflow: hidden;

    // Fallback
    @supports not (aspect-ratio: 1 / 1) {
      ::before {
        float: left;
        padding-top: 100%;
        content: '';
      }

      ::after {
        display: block;
        content: '';
        clear: both;
      }
    }
  }

  &.list {
    padding: 0.5rem 0;
    flex-direction: row;
    .image {
      max-width: 100px;
      width: 25%;
    }

    .text {
      text-align: left;
      padding: 0 1rem;
      align-self: start;
      align-items: flex-start;
      h4 {
        padding-bottom: 0.4rem;
      }
    }

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    &:first-of-type {
      border-top: 1px solid ${({ theme }) => theme.colors.gray};
    }
  }
`;

const StyledText = styled(motion.div)<{ isCenter?: boolean }>`
  align-self: ${({ isCenter }) => (isCenter ? 'center' : 'flex-start')};
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.light};

  h4,
  p {
    display: inline;
    width: fit-content;
    padding: 0.1rem;
    position: relative;
  }
  h4 {
    color: ${({ theme }) => theme.colors.mainText};
    font-weight: inherit;
  }
  p {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }

  ${breakpoints.xs} {
    h4 {
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
    }
  }
`;

interface Props {
  src: SanityImageSource;
  name: string;
  slug: string;
  price: number;
  viewMode?: ViewMode;
  hasFrom?: boolean;
}

const ImageVariants: Variants = {
  hover: {
    scale: 1.2,
    transition: {
      ease: 'easeIn',
    },
  },
};

const Card = ({ src, name, slug, price, viewMode, hasFrom }: Props) => {
  const [isPriceRevealed] = useAtom(priceRevealAtom);
  const isSSR = useIsSSR();

  return (
    <Link href={`/item/${slug}`} passHref>
      <a href="product" style={{ textDecoration: 'unset' }}>
        <StyledCard
          className={viewMode}
          layout={!isSSR}
          whileHover={viewMode === 'list' ? '' : 'hover'}
        >
          <motion.div className="image" layout={!isSSR}>
            <motion.div variants={ImageVariants}>
              {src && (
                <SanityImage
                  src={src}
                  options={{
                    imageBuilder: (builder) => builder.width(500).height(500).quality(100),
                  }}
                />
              )}
            </motion.div>
          </motion.div>

          <ClientSideOnly>
            <StyledText className="text" isCenter={!isPriceRevealed} layout={!isSSR}>
              <h4>{name}</h4>
              {isPriceRevealed ? (
                <p>
                  {hasFrom ? 'From' : null} ₱{price}
                </p>
              ) : null}
            </StyledText>
          </ClientSideOnly>
        </StyledCard>
      </a>
    </Link>
  );
};

export default Card;
