import '../scripts/wydr';
import PreviewHeader from '@components/Preview/PreviewHeader';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import { theme } from '@styles/theme';
import { previewAtom } from '@utils/jotai';
import { Provider } from 'jotai';
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider initialValues={[[previewAtom, pageProps.preview]]}>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <Head>
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff"></meta>
          </Head>
          <DefaultSeo
            defaultTitle="Canvas Jewelry"
            canonical="https://thecanvasjewelry.com"
            description="Everyday elegance crafted for you"
            openGraph={{
              type: 'website',
              locale: 'en_PH',
              title: 'Canvas Jewelry',
              description: 'Everyday elegance crafted for you',
              url: 'https://thecanvasjewelry.com',
              site_name: 'Canvas Jewelry',
              images: [
                {
                  url: 'https://cdn.sanity.io/images/94xotc05/production/2ed76ff2fed3e104230b9b4a0d1aeebc9081e76f-5298x3532.jpg?rect=0,375,5298,2781&w=1200&h=630',
                },
              ],
            }}
            facebook={{ appId: '2595973077370619' }}
          />
          <PreviewHeader>
            <Component {...pageProps} />
          </PreviewHeader>
        </ThemeProvider>
      </Provider>
    </>
  );
}
