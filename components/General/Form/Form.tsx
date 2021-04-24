import styled from '@emotion/styled';
import { createBreakpoint } from '@styles/breakpoints';
import FormControl from './FormControl';
import TextArea from './TextArea';
import Input from './Input';

const Form = styled.form<{ withBorder?: boolean }>`
  padding: 1em;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${({ withBorder, theme: { colors } }) => withBorder && `border: 1px solid ${colors.gray}`};

  .short-inputs {
    padding-top: 1rem;
    ${createBreakpoint(450)} {
      display: flex;

      ${FormControl} {
        flex: 1;
      }
    }
  }

  label {
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.coolGray[600]};
  }
`;

export default Object.assign(Form, { TextArea, FormControl, Input });
