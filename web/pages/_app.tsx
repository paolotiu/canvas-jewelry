import PreviewHeader from '@components/Preview/PreviewHeader';
import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import { theme } from '@styles/theme';
import { previewAtom } from '@utils/jotai';
import { Provider } from 'jotai';
import { AppProps } from 'next/app';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider initialValues={[[previewAtom, pageProps.preview]]}>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <PreviewHeader>
            <Component {...pageProps} />
          </PreviewHeader>
        </ThemeProvider>
      </Provider>
    </>
  );
}
