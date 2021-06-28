import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import Layout from '@components/Layout';
import NavGrid from '@components/NavGrid/NavGrid';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { HomepageSettings, ProductReturn } from '@utils/sanity/queries';
import { NavLink } from 'interfaces';
import React from 'react';
import { getHrefFromRef } from './getHrefFromRef';
import HomeBlock from './HomeBlock';

const links: NavLink[] = [
  {
    href: '/category/essentials',
    label: 'Essentials',
  },

  {
    href: '/category/best-sellers',
    label: 'Best Sellers',
  },

  {
    href: '/category/necklaces',
    label: 'Necklaces',
  },

  {
    href: '/category/personalized',
    label: 'Personalized',
  },
];

const BannerContainer = styled.div`
  ${breakpoints.sm} {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 0.2rem;
    height: 400px;
    max-width: 100%;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  ${breakpoints.md} {
    padding: 4rem 1rem 1rem 1rem;
  }
`;
interface Props {
  products: ProductReturn[];
  homepageSettings: HomepageSettings;
}
const Home = ({ products, homepageSettings }: Props) => {
  return (
    <Layout title="The Canvas Jewelry">
      <Content>
        <BannerContainer>
          <HomeBlock
            src={homepageSettings.homepageBlock1.blockImage.asset}
            label={homepageSettings.homepageBlock1.blockTitle}
            href={getHrefFromRef(homepageSettings.homepageBlock1.blockReference)}
          />
          <Carousel
            images={homepageSettings.homepageBanners}
            withAutoPlay
            options={{
              imageBuilder: (builder) => builder.height(1200).quality(100),
              enableBlurUp: true,
            }}
            objectFit="cover"
          />
          <HomeBlock
            src={homepageSettings.homepageBlock2.blockImage.asset}
            label={homepageSettings.homepageBlock2.blockTitle}
            href={getHrefFromRef(homepageSettings.homepageBlock2.blockReference)}
            unsetGrid
          />
          <HomeBlock
            src={homepageSettings.homepageBlock3.blockImage.asset}
            label={homepageSettings.homepageBlock3.blockTitle}
            href={getHrefFromRef(homepageSettings.homepageBlock3.blockReference)}
            unsetGrid
          />
        </BannerContainer>
        <NavGrid links={links} />
        <CardSection items={products || []} title="Best Sellers" />
      </Content>
    </Layout>
  );
};

export default Home;
