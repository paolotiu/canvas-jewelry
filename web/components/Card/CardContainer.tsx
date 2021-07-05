import styled from '@emotion/styled';
import { AnimateSharedLayout } from 'framer-motion';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn } from '@utils/sanity/queries';
import Card from './Card';
import { ViewMode } from './CardView';
import { sortModes, SortModes } from './sortFunctions';

const StyledCardContainer = styled.div`
  display: grid;
  padding: 1.3rem 5px;
  gap: 0.7rem;

  &.square {
    grid-template-columns: 1fr;
  }

  &.block {
    gap: 0.2rem;
    grid-template-columns: repeat(2, 1fr);
    ${breakpoints.md} {
      gap: 0.25rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &.cube {
    gap: 0.2rem;
    grid-template-columns: repeat(5, 1fr);
  }

  &.list {
    gap: 0;
  }
`;

interface Props {
  items: ProductReturn[];
  viewMode: ViewMode;
  sortMode: SortModes;
}

const CardContainer = ({ items, viewMode, sortMode }: Props) => {
  return (
    <>
      <StyledCardContainer className={viewMode}>
        <AnimateSharedLayout type="crossfade">
          {[...items].sort(sortModes[sortMode].fn).map((item) => {
            return (
              <Card
                src={item.mainImage}
                key={item._id}
                slug={item.slug}
                name={item.product?.name || ''}
                price={item.product?.price?.raw || 0}
                hasFrom={item.hasFrom}
                viewMode={viewMode}
              />
            );
          })}
        </AnimateSharedLayout>
      </StyledCardContainer>
    </>
  );
};

export default CardContainer;
