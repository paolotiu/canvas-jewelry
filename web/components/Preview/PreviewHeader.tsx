import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import Link from 'next/link';
import React from 'react';

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}

const StyledPreviewMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.coolGray['500']};
  z-index: 100;
  padding: 1rem;
  color: white;
  font-weight: bold;
  position: relative;

  ${breakpoints.lg} {
    display: flex;
    justify-content: center;
    margin-left: 250px;
  }
`;

const StyledExitPreview = styled.a`
  margin-left: 10px;
  text-decoration: underline;
  :hover {
    color: ${({ theme }) => theme.colors.mainText};
  }
`;

const PreviewHeader = ({ preview = false, children }: Props) => {
  if (!preview) {
    return <>{children}</>;
  }

  return (
    <>
      <StyledPreviewMessage>
        <p>You are in preview mode</p>
        <Link href="/api/exit-preview" passHref>
          <StyledExitPreview href="exit">Exit Preview</StyledExitPreview>
        </Link>
      </StyledPreviewMessage>
      {children}
    </>
  );
};

export default PreviewHeader;
