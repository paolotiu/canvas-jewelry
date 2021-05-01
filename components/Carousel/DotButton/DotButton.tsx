import styled from '@emotion/styled';
import { theme } from '@styles/theme';
import { motion, Variants } from 'framer-motion';

const StyledDotButton = styled(motion.button)<{ active?: boolean }>`
  --background-position: right;
  background-color: transparent;
  border: 0;
  width: 28px;
  height: 4px;
  display: flex;
  margin: 0 5px;
  background: ${({ theme: { colors } }) => colors.coolGray[400]};
  align-items: center;
`;

const variants: Variants = {
  active: {
    width: 40,
    background: theme.colors.coolGray[600],
    transition: {
      duration: 0.4,
      easings: 'easeIn',
    },
  },
};
interface Props {
  active?: boolean;
  onClick: () => void;
}
const DotButton = ({ active, onClick }: Props) => (
  <StyledDotButton
    type="button"
    onClick={onClick}
    active={active}
    animate={active && 'active'}
    variants={variants}
  />
);

export default DotButton;
