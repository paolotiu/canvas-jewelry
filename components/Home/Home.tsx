import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import NavGrid from '@components/NavGrid/NavGrid';
import { getItems } from '@utils/queries';
import { NavLink } from 'interfaces';
import React from 'react';
import { useQuery } from 'react-query';

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

const Home = () => {
  const { data } = useQuery('images', () => getItems());
  return (
    <div>
      <Header />

      <Carousel images={data?.map((item) => item.imageUrls[0]) || []} withAutoPlay />
      <NavGrid links={links} />
      <CardSection items={data || []} title="Best Sellers" />
      <Footer />
    </div>
  );
};

export default Home;
