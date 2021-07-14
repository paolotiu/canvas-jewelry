import { LineItem } from '@chec/commerce.js/types/line-item';
import Image from 'next/image';
import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  display: flex;

  > div:not(:first-of-type) {
    margin-left: 1rem;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
  }

  .attribute {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const AttributesContainer = styled.div`
  display: grid;
  gap: 0.1rem;
  padding-top: 0.4rem;
`;

const Quantity = styled.p`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;
interface Props {
  item: LineItem;
}

const PreviewItem = ({ item }: Props) => {
  return (
    <Container>
      <div>
        <Image src={item.media.source} width={60} height={80} />
      </div>
      <DetailsContainer>
        <h4>{item.name}</h4>
        <AttributesContainer>
          {(item as any).selected_options.map((val: any) => (
            <p key={val.option_id} className="attribute">
              {val.group_name === 'Size' ? 'size' : null} {val.option_name}
            </p>
          ))}

          <p className="attribute">{item.price.formatted_with_symbol}</p>
        </AttributesContainer>
        <Quantity>Quantity: {item.quantity}</Quantity>
      </DetailsContainer>
    </Container>
  );
};

export default PreviewItem;
