// import Square from '@assets/icons/square.svg';
import Blocks from '@assets/icons/4square.svg';
import Cubes from '@assets/icons/9square.svg';
import List from '@assets/icons/listview.svg';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import CardSort from './CardSort';

const StyledCardView = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.inactive};
  svg {
    fill: currentColor;
    cursor: pointer;
  }
  svg.active {
    fill: ${({ theme }) => theme.colors.secondaryText};
  }

  #square {
    ${breakpoints.sm} {
      display: none;
    }
  }

  #cubes {
    display: none;
    ${breakpoints.sm} {
      display: block;
    }
  }
`;

const CardSortContainer = styled.div`
  display: flex;
`;

const PipeContainer = styled.div`
  display: none;
  ${breakpoints.md} {
    display: block;
  }
`;
export type ViewMode = 'square' | 'block' | 'list' | 'cube';

interface Props {
  viewMode: ViewMode;
  onClick: (viewMode: ViewMode) => void;
}

const CardView = ({ viewMode, onClick }: Props) => {
  return (
    <StyledCardView>
      <CardSortContainer>
        <CardSort />
      </CardSortContainer>
      <PipeContainer>|</PipeContainer>
      {/* <Square
        id="square"
        className={viewMode === 'square' ? 'active' : ''}
        onClick={() => {
          onClick('square');
        }}
      /> */}
      <Blocks
        className={viewMode === 'block' ? 'active' : ''}
        onClick={() => {
          onClick('block');
        }}
      />
      <Cubes
        id="cubes"
        className={viewMode === 'cube' ? 'active' : ''}
        onClick={() => {
          onClick('cube');
        }}
      />
      <List className={viewMode === 'list' ? 'active' : ''} onClick={() => onClick('list')} />
    </StyledCardView>
  );
};

export default CardView;
