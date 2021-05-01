import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .image {
    --size: 100px;
    position: relative;
    width: 99%;
    height: auto;
    aspect-ratio: 1/1;

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
  }
`;

interface Props {
  src: string;
  name: string;
}

const Card = ({ src, name }: Props) => {
  return (
    <StyledCard>
      <div className="image">
        <Image src={src} layout="fill" objectFit="fill" />
      </div>
      <div className="text">
        <h4>{name}</h4>
        <p> A description here lmaooo</p>
      </div>
    </StyledCard>
  );
};

export default Card;
