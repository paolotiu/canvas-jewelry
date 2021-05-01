import Square from '@assets/icons/square.svg';
import Blocks from '@assets/icons/4square.svg';
import List from '@assets/icons/listview.svg';
import styled from '@emotion/styled';

const StyledCardView = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2.5rem 2.5rem 1rem 2.5rem;
  color: ${({ theme }) => theme.colors.inactive};
  svg {
    fill: currentColor;
  }
  svg.active {
    fill: ${({ theme }) => theme.colors.secondaryText};
  }
`;

export type ViewMode = 'square' | 'block' | 'list';
interface Props {
  viewMode: ViewMode;
  onClick: (viewMode: ViewMode) => void;
}

const CardView = ({ viewMode, onClick }: Props) => {
  return (
    <StyledCardView>
      <Square
        className={viewMode === 'square' ? 'active' : ''}
        onClick={() => {
          onClick('square');
        }}
      />
      <Blocks
        className={viewMode === 'block' ? 'active' : ''}
        onClick={() => {
          onClick('block');
        }}
      />
      <List className={viewMode === 'list' ? 'active' : ''} onClick={() => onClick('list')} />
    </StyledCardView>
  );
};

export default CardView;
