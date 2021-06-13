import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import Layout from '@components/Layout';
import NavGrid from '@components/NavGrid/NavGrid';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { urlFor } from '@utils/queries/imageBuilder';
import { ProductExpanded } from '@utils/queries/products';
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
  products: ProductExpanded[];
}
const Home = ({ products }: Props) => {
  return (
    <Layout title="The Canvas Jewelry">
      <Content>
        <BannerContainer>
          <Block1 />
          <Carousel
            images={products?.map((item) => urlFor(item.images[0]).url() || '')}
            withAutoPlay
          />
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
