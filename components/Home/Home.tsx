import Carousel from '@components/Carousel/Carousel';
import Header from '@components/Header/Header';
import NavGrid from '@components/NavGrid/NavGrid';
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
    </div>
  );
};

export default Home;
