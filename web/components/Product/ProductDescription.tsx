import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';
import React from 'react';

interface Props {
  blocks: any;
}

const BlockWrapper = styled.div`
  padding: 0.4rem 1rem;
  li {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.coolGray[600]};
  }
`;

const ProductDescription = ({ blocks }: Props) => {
  return (
    <BlockWrapper>
      <BlockContent blocks={blocks} />
    </BlockWrapper>
  );
};

export default ProductDescription;
