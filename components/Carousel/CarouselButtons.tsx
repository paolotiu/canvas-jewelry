import styled from '@emotion/styled';
import RightChevron from '@assets/svgs/chevron-right.svg';
import LeftChevron from '@assets/svgs/chevron-left.svg';

const StyledPrevButton = styled.button`
  --spacing: 5%;
  position: absolute;
  top: 50%;
  left: var(--spacing);
  transform: translateY(-50%);
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.inactiveTransparent};
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.activeTransparent};
  }
`;
interface ControlButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}
export const PrevButton = ({ onClick, children }: ControlButtonProps) => (
  <StyledPrevButton type="button" onClick={onClick}>
    <LeftChevron />

    {children}
  </StyledPrevButton>
);

const StyledNextButton = styled(StyledPrevButton)`
  left: unset;
  right: var(--spacing);
`;

export const NextButton = ({ onClick, children }: ControlButtonProps) => (
  <StyledNextButton type="button" onClick={onClick}>
    <RightChevron />
    {children}
  </StyledNextButton>
);
