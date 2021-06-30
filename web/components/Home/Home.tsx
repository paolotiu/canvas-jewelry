import CardSection from '@components/Card/CardSection';
import Carousel from '@components/Carousel/Carousel';
import ClientSideOnly from '@components/ClientSideOnly/ClientSideOnly';
import Layout from '@components/Layout';
import NavGrid from '@components/NavGrid/NavGrid';
import styled from '@emotion/styled';
import { breakpoints, points } from '@styles/breakpoints';
import { useWindowWidth } from '@utils/hooks/useWindowWidth';
import { HomepageSettings, ProductReturnWithPriceVariants } from '@utils/sanity/queries';
import React from 'react';
import { getHrefFromRef } from './getHrefFromRef';

const BannerContainer = styled.div`
  ${breakpoints.sm} {
    /* display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr)); */
    /* gap: 0.2rem; */
    /* height: 400px;
    max-width: 100%; */
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
  const windowWidth = useWindowWidth();
  return (
    <Layout title="The Canvas Jewelry">
      <Content>
        <BannerContainer>
          {/* <HomeBlock
            src={homepageSettings.homepageBlock1.image.asset}
            label={homepageSettings.homepageBlock1.title}
            href={getHrefFromRef(homepageSettings.homepageBlock1.reference)}
          /> */}
          <ClientSideOnly
            loader={<div style={{ width: '400px', height: '400px', maxWidth: '100vw' }}></div>}
          >
            <Carousel
              images={homepageSettings.homepageBanners}
              options={{
                imageBuilder: (builder) => {
                  if (windowWidth > points.sm) {
                    return builder.width(1200).height(400).quality(100);
                  }
                  const width = Math.min(375, windowWidth);
                  return builder
                    .width(Math.floor(width * 3))
                    .height(Math.floor(width * 3))
                    .quality(100);
                },
              }}
              autoPlayInterval={5000}
              withAutoPlay
            />
          </ClientSideOnly>

          {/* <HomeBlock
            src={homepageSettings.homepageBlock2.image.asset}
            label={homepageSettings.homepageBlock2.title}
            href={getHrefFromRef(homepageSettings.homepageBlock2.reference)}
            unsetGrid
          />
          <HomeBlock
            src={homepageSettings.homepageBlock3.image.asset}
            label={homepageSettings.homepageBlock3.title}
            href={getHrefFromRef(homepageSettings.homepageBlock3.reference)}
            unsetGrid
          /> */}
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
