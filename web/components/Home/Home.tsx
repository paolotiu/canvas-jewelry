import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import Layout from '@components/Layout';
import NavGrid from '@components/NavGrid/NavGrid';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { ProductReturn } from '@utils/sanity/queries';
import { NavLink } from 'interfaces';
import React from 'react';

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
    min-height: 400px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  ${breakpoints.md} {
    padding: 4rem 1rem 1rem 1rem;
  }
`;

const Block1 = styled.div`
  grid-column: 3 / -1;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const Block2 = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
`;

interface Props {
  products: ProductReturn[];
  banners: ProductReturn;
}
const Home = ({ products, banners }: Props) => {
  return (
    <Layout title="The Canvas Jewelry">
      <Content>
        <BannerContainer>
          <Block1 />
          <Carousel images={banners.images} withAutoPlay cover />
          <Block2 />
          <Block2 />
        </BannerContainer>
        <NavGrid links={links} />
        <CardSection items={products || []} title="Best Sellers" />
      </Content>
    </Layout>
  );
};

export default Home;
