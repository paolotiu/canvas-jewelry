import styled from '@emotion/styled';
import { ButtonColors, theme as t } from '@styles/theme';

type Colors = keyof typeof t.colors;
interface ButtonProps {
  size?: keyof typeof t.typography.fontSizes;
  isWhite?: boolean;
  backgroundColor?: ButtonColors;
  withBorder?: boolean | Colors;
  borderRadius?: keyof typeof t.borderRadius;
  fontWeight?: keyof typeof t.typography.fontWeights;
  hoverColor?: Colors;
  color?: Colors;
}
const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? theme.borderRadius[borderRadius] : 0};
  border: ${({ theme, withBorder, backgroundColor }) =>
    withBorder === true
      ? backgroundColor
        ? `1px solid ${theme.colors[backgroundColor]}`
        : `1px solid ${theme.colors.black}`
      : withBorder
      ? `1px solid ${theme.colors[withBorder]}`
      : 'none'};
  font-size: ${({
    theme: {
      typography: { fontSizes },
    },
    size = 'xl',
  }) => fontSizes[size]};

  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.colors[backgroundColor] : 'white'};
  color: ${({ theme, isWhite, color }) =>
    color === 'coolGray'
      ? theme.colors.coolGray[600]
      : isWhite
      ? theme.colors.white
      : theme.colors.black};

  padding: ${({ size }) => (size === 'sm' ? '0.35em 1em' : `0.4em 0.8em`)};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight ? theme.typography.fontWeights[fontWeight] : ''};

  :hover {
    background-color: ${({ hoverColor, theme: { colors } }) =>
      hoverColor ? colors[hoverColor] : ''};
  }
`;
export default Button;
