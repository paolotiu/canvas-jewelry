import styled from '@emotion/styled';
import { ItemData } from 'interfaces';
import Card from './Card';

const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 5px;
  gap: 0.2rem;
`;

interface Props {
  items: ItemData[];
}

const CardContainer = ({ items }: Props) => {
  return (
    <StyledCardContainer>
      {items.map((item) => {
        return <Card src={item.imageUrls[0]} name={item.name} />;
      })}
    </StyledCardContainer>
  );
};

export default CardContainer;
