import styled from '@emotion/styled';
import { createBreakpoint } from '@styles/breakpoints';
import FormControl from './FormControl';
import TextArea from './TextArea';
import Input from './Input';

const Form = styled.form`
  padding: 1em;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  .short-inputs {
    padding-top: 1rem;
    ${createBreakpoint(450)} {
      display: flex;

      ${FormControl} {
        flex: 1;
      }
    }
  }
`;

export default Object.assign(Form, { TextArea, FormControl, Input });
