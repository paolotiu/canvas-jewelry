import { Title } from '@components/Title/Title';
import { ItemData } from 'interfaces';
import { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import CardView, { ViewMode } from './CardView';

interface Props {
  title: string;
  items: ItemData[];
}

const CardSection = ({ title, items }: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>('square');

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 500) {
      setViewMode('block');
    }
  }, []);

  return (
    <section>
      <CardView viewMode={viewMode} onClick={(val) => setViewMode(val)} />

      <Title>{title}</Title>
      <CardContainer items={items} viewMode={viewMode} />
    </section>
  );
};

export default CardSection;
