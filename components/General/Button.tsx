import styled from '@emotion/styled';
import { ButtonColors, theme as t } from '@styles/theme';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  isWhite?: boolean;
  backgroundColor?: ButtonColors;
  withBorder?: boolean;
  borderRadius?: keyof typeof t.borderRadius;
}
const Button = styled.button<ButtonProps>`
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? theme.borderRadius[borderRadius] : 0};
  border: ${({ theme, withBorder }) => (withBorder ? `1px solid ${theme.colors.black}` : 'none')};
  font-size: ${({
    theme: {
      typography: { fontSizes },
    },
    size,
  }) => (size === 'lg' ? fontSizes.xl : fontSizes.lg)};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.colors[backgroundColor] : 'white'};
  color: ${({ theme, isWhite }) => (isWhite ? theme.colors.white : theme.colors.black)};
  padding: 0.6em 0.3em;
`;
export default Button;
