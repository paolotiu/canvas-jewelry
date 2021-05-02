import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import Layout from '@components/Layout';
import NavGrid from '@components/NavGrid/NavGrid';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
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

const BannerContainer = styled.div`
  ${breakpoints.sm} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.2rem;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  ${breakpoints.md} {
    padding: 1rem;
  }
`;

const Block1 = styled.div`
  grid-column: 3 / -1;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const Block2 = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
`;

const Home = () => {
  const { data } = useQuery('images', () => getItems());
  return (
    <Layout title="The Canvas Jewelry">
      <Content>
        <BannerContainer>
          <Block1 />
          <Carousel images={data?.map((item) => item.imageUrls[0]) || []} withAutoPlay />
          <Block2 />
          <Block2 />
        </BannerContainer>
        <NavGrid links={links} />
        <CardSection items={data || []} title="Best Sellers" />
      </Content>
    </Layout>
  );
};

export default Home;
