import { Title } from '@components/Title/Title';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { ItemData } from 'interfaces';
import { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import CardView, { ViewMode } from './CardView';

interface Props {
  title: string;
  items: ItemData[];
}

const StyledCardSection = styled.section`
  ${breakpoints.md} {
    padding-top: 4rem;
  }
`;

const CardMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0 0.7rem 0;
  gap: 1rem;
  ${breakpoints.md} {
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: baseline;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const CardSection = ({ title, items }: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>('square');

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 500) {
      setViewMode('block');
    }
  }, []);

  return (
    <StyledCardSection>
      <CardMetaContainer>
        <CardView viewMode={viewMode} onClick={(val) => setViewMode(val)} />
        <Title>{title}</Title>
      </CardMetaContainer>
      <CardContainer items={items} viewMode={viewMode} />
    </StyledCardSection>
  );
};

export default CardSection;
