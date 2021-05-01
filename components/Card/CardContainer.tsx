import styled from '@emotion/styled';
import { ItemData } from 'interfaces';
import Card from './Card';
import { ViewMode } from './CardView';

const StyledCardContainer = styled.div`
  display: grid;
  padding: 1.3rem 5px;
  gap: 0.2rem;

  &.square {
    grid-template-columns: 1fr;
  }

  &.block {
    grid-template-columns: 1fr 1fr;
  }

  &.list {
    gap: 0;
  }
`;

interface Props {
  items: ItemData[];
  viewMode: ViewMode;
}

const CardContainer = ({ items, viewMode }: Props) => {
  return (
    <>
      <StyledCardContainer className={viewMode}>
        {items.map((item) => {
          return (
            <Card key={item._id} className={viewMode} src={item.imageUrls[0]} name={item.name} />
          );
        })}
      </StyledCardContainer>
    </>
  );
};

export default CardContainer;
