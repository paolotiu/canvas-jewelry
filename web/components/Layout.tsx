import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { breakpoints } from '@styles/breakpoints';
import Header from './Header/Header';
import Footer from './Footer/Footer';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  main {
    flex: 1;
  }
`;
const ContentWrapper = styled.main`
  ${breakpoints.lg} {
    display: flex;
    justify-content: center;
    margin-left: 250px;
  }
`;

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Container>
  </div>
);

export default Layout;
