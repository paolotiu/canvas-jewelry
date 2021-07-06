import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';

export const ProductContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .card-section {
    grid-column: 1 /-1;
    padding: 0 4rem;
    padding-top: 4rem;
  }
  .content {
    max-width: 1200px;
    width: 100%;
    padding: 1rem 0;
    padding-top: 0;
    margin: 0 0rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

    ${breakpoints.sm} {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 4rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .carousel-wrapper {
      grid-column: unset;
      ${breakpoints.sm} {
        max-width: 500px;
        max-height: unset;
      }
    }
  }
`;
