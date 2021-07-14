import Button from '@components/Common/Button/Button';
import Layout from '@components/Layout';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import Link from 'next/link';
import React from 'react';

const Container = styled.div`
  display: grid;
  position: absolute;
  place-items: center;
  top: 30%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  padding: 3rem 0;
  gap: 1rem;

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  }
  p {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
  .disclaimer {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  .center-text {
    text-align: center;
  }
  ${breakpoints.md} {
    h4 {
      font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
    }
    p {
      font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    }
  }
`;

const SuccessScreen = () => {
  return (
    <Layout>
      <Container>
        <h4>Payment Successful!</h4>
        <div className="center-text">
          <p>Check your inbox for the receipt.</p>
          <p className="disclaimer">(the email may take some time to send.)</p>
        </div>
        <Link href="/" passHref>
          <Button backgroundColor="black" color="white" style={{ padding: '1rem' }}>
            Return to homepage
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default SuccessScreen;
