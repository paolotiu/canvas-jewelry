import styled from '@emotion/styled';
import { motion, Variants } from 'framer-motion';

const StyledDotButton = styled(motion.button)<{ active?: boolean }>`
  --background-position: right;
  background-color: transparent;
  border: 0;
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  ::after {
    content: '';
    width: 100%;
    height: 4px;
    background: ${({ theme: { colors } }) =>
      `linear-gradient(to right, ${colors.whiteAlpha[500]} 50%, ${colors.blackAlpha[500]} 50%)`};
    background-size: 200% 100%;
    background-position: var(--background-position);
    transition: all 0.2s linear;
  }
`;

const variants: Variants = {
  active: {
    ['--background-position' as any]: 'left ',
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
