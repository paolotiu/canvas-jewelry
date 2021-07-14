import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';

export const Container = styled.div`
  h3 {
    font-weight: 400;
    font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  }
`;

export const InputsContainer = styled.div`
  padding-top: 1rem;
  display: grid;
  gap: 1rem;
`;

export const SplitInput = styled.div<{ gtc?: string }>`
  display: grid;
  gap: inherit;

  ${breakpoints.xs} {
    grid-template-columns: ${({ gtc }) => gtc || null};
    grid-auto-flow: column;
  }
`;
