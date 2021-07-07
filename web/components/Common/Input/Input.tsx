import styled from '@emotion/styled';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const StyledInputContainer = styled.div<{ isError?: boolean }>`
  label {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  input {
    border: 1px solid
      ${({ theme, isError }) => (isError ? theme.colors.danger : theme.colors.blackAlpha['200'])};
    color: ${({ theme }) => theme.colors.black};

    margin-top: 0.15rem;
    padding: 0.5rem 0.4rem;
    width: 100%;

    :focus {
      outline: none;
      border-color: ${({ theme, isError }) =>
        isError ? theme.colors.danger : theme.colors.blackAlpha['400']};
    }
    :read-only {
      background-color: ${({ theme }) => theme.colors.blackAlpha['100']};
      color: ${({ theme }) => theme.colors.blackAlpha['500']};
    }
  }
  .error {
    color: ${({ theme }) => theme.colors.danger};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`;

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  isError?: boolean;
  errorMessage?: string;
}
const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, isError = false, errorMessage, ...props }: Props, ref) => {
    return (
      <StyledInputContainer isError={isError}>
        <label htmlFor={name}> {label}</label>
        <input type="text" name={name} {...props} ref={ref} />
        {isError ? <span className="error">{errorMessage}</span> : null}
      </StyledInputContainer>
    );
  },
);

export default Input;
