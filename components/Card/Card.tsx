import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import React from 'react';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      width: 25%;
    }

    .text {
      text-align: left;
      padding: 0 1rem;
      align-self: start;
      h4 {
        padding-bottom: 0.4rem;
      }
    }

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    &:first-of-type {
      border-top: 1px solid ${({ theme }) => theme.colors.gray};
    }
  }

  .text {
    text-align: center;
    padding: 0.4rem 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.light};
    h4,
    p {
      padding: 0.1rem;
    }
    h4 {
      color: ${({ theme }) => theme.colors.mainText};
      font-weight: inherit;
    }
    p {
      color: ${({ theme }) => theme.colors.secondaryText};
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    }

    ${breakpoints.xs} {
      h4 {
        font-size: ${({ theme }) => theme.typography.fontSizes.lg};
      }

      p {
        font-family: ${({ theme }) => theme.typography.fontSizes.md};
      }
    }

    ${breakpoints.sm} {
      h4 {
        font-size: ${({ theme }) => theme.typography.fontSizes.xl};
      }

      p {
        font-family: ${({ theme }) => theme.typography.fontSizes.lg};
      }
    }
  }
`;

interface Props {
  src: string;
  name: string;
  className: string;
}

const Card = ({ src, name, className }: Props) => {
  return (
    <StyledCard className={className}>
      <div className="image">
        <img src={src} width="100%" height="100%" alt={name} />
      </div>
      <div className="text">
        <h4>{name}</h4>
        <p> A description here lmaooo</p>
      </div>
    </StyledCard>
  );
};

export default Card;
