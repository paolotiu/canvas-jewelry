/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';
import { range } from '@utils/range';
import * as React from 'react';
import ImageInput from './ImageInput';

const StyledImageInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  imagePaths: string[];
  defaultCount?: number;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const getPlaceholderCount = (defaultCount: number, imagePathsLength: number) =>
  defaultCount - imagePathsLength > 0 ? defaultCount - imagePathsLength : 0;

const getPlaceholderStartIndex = (defaultCount: number, placeHolderCount: number) =>
  defaultCount - placeHolderCount;

const ImageInputContainer = ({ imagePaths, defaultCount = 5, onDelete, onChange }: Props) => {
  const placeholderCount = getPlaceholderCount(defaultCount, imagePaths.length);
  const placeholderStartIndex = getPlaceholderStartIndex(defaultCount, placeholderCount);
  return (
    <>
      <StyledImageInputContainer>
        {imagePaths.map((src, i) => (
          <ImageInput index={i} src={src} onDeleteClick={onDelete} key={src} onChange={onChange} />
        ))}
        {range(placeholderStartIndex, defaultCount).map((val) => (
          <ImageInput index={val} onDeleteClick={onDelete} onChange={onChange} key={val} />
        ))}
      </StyledImageInputContainer>
    </>
  );
};

export default ImageInputContainer;
