import { Title } from '@components/Title/Title';
import { ItemData } from 'interfaces';
import { useState } from 'react';
import CardContainer from './CardContainer';
import CardView, { ViewMode } from './CardView';

interface Props {
  title: string;
  items: ItemData[];
}

const CardSection = ({ title, items }: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>('square');
  return (
    <section>
      <Title>{title}</Title>
      <CardView viewMode={viewMode} onClick={(val) => setViewMode(val)} />
      <CardContainer items={items} viewMode={viewMode} />
    </section>
  );
};

export default CardSection;
