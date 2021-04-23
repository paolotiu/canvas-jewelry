import styled from '@emotion/styled';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  primary?: boolean;
}
const Button = styled.button<ButtonProps>`
  border: 1px solid ${({ theme }) => theme.colors.black};
  font-size: ${({
    theme: {
      typography: { fontSizes },
    },
    size,
  }) => (size === 'lg' ? fontSizes.xl : fontSizes.lg)};
  background-color: ${({ theme, primary }) => (primary ? theme.colors.black : theme.colors.white)};
  color: ${({ theme, primary }) => (primary ? theme.colors.white : theme.colors.black)};
  padding: 0.6em 0.3em;
`;
export default Button;
