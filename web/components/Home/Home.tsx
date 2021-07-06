import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import Layout from '@components/Layout';
import NavGrid from '@components/NavGrid/NavGrid';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { HomepageSettings, ProductReturnWithPriceVariants } from '@utils/sanity/queries';
import React from 'react';
import { getHrefFromRef } from './getHrefFromRef';
import HomeBlock from './HomeBlock';

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
  products: ProductReturnWithPriceVariants[];
  homepageSettings: HomepageSettings;
}
const Home = ({ products, homepageSettings }: Props) => {
  return (
    <Layout title="The Canvas Jewelry">
      <Content>
        <BannerContainer>
          <HomeBlock
            src={homepageSettings.homepageBlock1.image.asset}
            label={homepageSettings.homepageBlock1.title}
            href={getHrefFromRef(homepageSettings.homepageBlock1.reference)}
          />
          <HomeBlock
            src={homepageSettings.homepageBlock2.image.asset}
            label={homepageSettings.homepageBlock2.title}
            href={getHrefFromRef(homepageSettings.homepageBlock2.reference)}
          />
          <Carousel
            images={homepageSettings.homepageBanners}
            autoPlayInterval={5000}
            withAutoPlay
            objectFit="cover"
            priority
            responsiveImage
          />
        </BannerContainer>
        <NavGrid
          links={homepageSettings.nav.map((navLink) => ({
            href: getHrefFromRef(navLink.reference),
            label: navLink.title,
          }))}
        />
        <CardSection items={products || []} title="Best Sellers" />
      </Content>
    </Layout>
  );
};

export default Home;
