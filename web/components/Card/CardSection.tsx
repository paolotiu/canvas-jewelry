import { Title } from '@components/Title/Title';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn } from '@utils/sanity/queries';
import { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import CardView, { ViewMode } from './CardView';

const StyledCardSection = styled.section`
  ${breakpoints.md} {
    padding-top: 4rem;
  }
`;

const CardMetaContainer = styled.div<{
  flatten?: boolean;
}>`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0 0.7rem 0;
  gap: 1rem;
  ${(props) =>
    props.flatten &&
    `
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: baseline;
    padding-left: 5px;
    padding-right: 5px;
`};
  ${breakpoints.md} {
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: baseline;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

interface Props {
  title: string;
  items: ProductReturn[];
  defaultView?: ViewMode;
  withViewControls?: boolean;
}

const CardSection = ({ title, items, defaultView, withViewControls = true }: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView || 'block');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 500) {
        setViewMode('block');
      }
    };
    window.addEventListener('resize', handleResize);

    if (!defaultView) {
      // Check
      handleResize();
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [defaultView]);

  return (
    <StyledCardSection className="card-section">
      <CardMetaContainer>
        {withViewControls && <CardView viewMode={viewMode} onClick={(val) => setViewMode(val)} />}
        <Title>{title}</Title>
      </CardMetaContainer>
      <CardContainer items={items} viewMode={viewMode} />
    </StyledCardSection>
  );
};

export default CardSection;
