import Square from '@components/assets/icons/square.svg';
import Blocks from '@components/assets/icons/4square.svg';
import List from '@components/assets/icons/listview.svg';
import styled from '@emotion/styled';

const StyledCardView = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
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
