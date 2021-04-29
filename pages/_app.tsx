import { Global, ThemeProvider } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import { theme } from '@styles/theme';
import { AppProps } from 'next/app';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'next-auth/client';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClientRef.current}>
        <ThemeProvider theme={theme}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider session={pageProps.session}>
              <Component {...pageProps} />
            </Provider>
          </Hydrate>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
