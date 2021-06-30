import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { priceRevealAtom, sortModeAtom } from '@utils/jotai';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { sortModes, SortModes } from './sortFunctions';

const Container = styled.div`
  position: relative;

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.inactive};
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
const StyledSortButton = styled.button`
  background: none;
  border: none;
  padding-top: 0.05rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  display: flex;
  align-items: center;
  :hover {
    color: ${({ theme }) => theme.colors.activeTransparent};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  ${breakpoints.md} {
    left: unset;
    right: 0;
  }
  background-color: white;
  z-index: 1;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1), 0 1px 3px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  button {
    color: ${({ theme }) => theme.colors.secondaryText};
    :hover {
      background-color: ${({ theme }) => theme.colors.blackAlpha['200']};
    }
    :focus {
      background-color: ${({ theme }) => theme.colors.blackAlpha['200']};
    }
    padding: 0.8rem 1rem;
  }
`;

const CardSort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortMode, setSortMode] = useAtom(sortModeAtom);
  const [isPriceRevealed] = useAtom(priceRevealAtom);

  useEffect(() => {
    const closeDropdown = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('mousedown', closeDropdown);
    }

    return () => {
      window.removeEventListener('mousedown', closeDropdown);
    };
  }, [isOpen]);

  const Icon = sortModes[sortMode].icon;
  return (
    <Container>
      <StyledSortButton type="button" onClick={() => setIsOpen(true)}>
        <Icon size="1rem" style={{ width: 19, height: 19 }} strokeWidth={1} />
      </StyledSortButton>

      {isOpen ? (
        <Dropdown onMouseDown={(e) => e.stopPropagation()}>
          {Object.entries(sortModes).map(([key, { label }]) => {
            if (!isPriceRevealed && key.includes('price')) return null;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSortMode(key as SortModes);
                  setIsOpen(false);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                {label}
              </button>
            );
          })}
        </Dropdown>
      ) : null}
    </Container>
  );
};

export default CardSort;
