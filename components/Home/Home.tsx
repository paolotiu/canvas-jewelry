import Card from '@components/Card/Card';
import CardContainer from '@components/Card/CardContainer';
import Carousel from '@components/Carousel/Carousel';
import Header from '@components/Header/Header';
import NavGrid from '@components/NavGrid/NavGrid';
import { Title } from '@components/Title/Title';
import { getItems } from '@utils/queries';
import { NavLink } from 'interfaces';
import React from 'react';
import { useQuery } from 'react-query';

interface Props {}

const links: NavLink[] = [
  {
    href: '/',
    label: 'home',
  },

  {
    href: '/',
    label: 'Best Sellers',
  },

  {
    href: '/',
    label: 'Necklaces',
  },

  {
    href: '/',
    label: 'Classics',
  },
];

const Home = (props: Props) => {
  const { data, isLoading } = useQuery('images', () => getItems());
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Header />

      <Carousel images={data?.map((item) => item.imageUrls[0]) || []} withAutoPlay />
      <NavGrid links={links} />

      <Title>Best Sellers</Title>
      <CardContainer items={data || []} />
    </div>
  );
};

export default Home;
