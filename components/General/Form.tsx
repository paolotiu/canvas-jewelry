import styled from '@emotion/styled';
import { breakpoints, createBreakpoint } from '@styles/breakpoints';

const Form = styled.form`
  padding: 1em;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  .short-inputs {
    padding-top: 1rem;
    ${createBreakpoint(450)} {
      display: flex;

      div {
        flex: 1;
      }
    }
  }
`;
export default Form;
