import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { previewAtom } from '@utils/jotai';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const StyledPreviewMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.coolGray['500']};
  z-index: 100;
  padding: 1rem 2rem;
  color: white;
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  ${breakpoints.lg} {
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

const PreviewHeader = ({ children }: Props) => {
  const [isPreview] = useAtom(previewAtom);
  if (!isPreview) {
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
