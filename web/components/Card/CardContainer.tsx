import styled from '@emotion/styled';
import { AnimateSharedLayout } from 'framer-motion';
import { breakpoints } from '@styles/breakpoints';
import { urlFor } from '@utils/sanity/sanity';
import { ProductReturn } from '@utils/sanity/queries';
import Card from './Card';
import { ViewMode } from './CardView';

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
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &.cube {
    grid-template-columns: repeat(5, 1fr);
  }

  &.list {
    gap: 0;
  }
`;

interface Props {
  items: ProductReturn[];
  viewMode: ViewMode;
}

const CardContainer = ({ items, viewMode }: Props) => {
  return (
    <>
      <StyledCardContainer className={viewMode}>
        <AnimateSharedLayout type="crossfade">
          {items.map((item) => {
            return (
              <Card
                key={item._id}
                slug={item.slug}
                className={viewMode}
                description={item.description || ''}
                src={urlFor(item.images[0]).width(1000).height(1000).quality(100).url() || ''}
                name={item.name}
              />
            );
          })}
        </AnimateSharedLayout>
      </StyledCardContainer>
    </>
  );
};

export default CardContainer;
