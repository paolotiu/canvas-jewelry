import styled from '@emotion/styled';
import { range } from '@utils/range';
import * as React from 'react';
import ImageInput, { ImageInputProps } from './ImageInput';

const StyledImageInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface Props extends Omit<ImageInputProps, 'src' | 'multiple' | 'index'> {
  imagePaths: string[];
  defaultCount?: number;
}

const getPlaceholderCount = (defaultCount: number, imagePathsLength: number) =>
  defaultCount - imagePathsLength > 0 ? defaultCount - imagePathsLength : 0;

const getPlaceholderStartIndex = (defaultCount: number, placeHolderCount: number) =>
  defaultCount - placeHolderCount;

const ImageInputContainer = ({
  imagePaths,
  defaultCount = 5,
  onDelete,
  onChange,
  setImage,
}: Props) => {
  const placeholderCount = getPlaceholderCount(defaultCount, imagePaths.length);
  const placeholderStartIndex = getPlaceholderStartIndex(defaultCount, placeholderCount);
  return (
    <>
      <StyledImageInputContainer>
        {imagePaths.map((src, i) => (
          <ImageInput
            index={i}
            src={src}
            onDelete={onDelete}
            key={src}
            onChange={onChange}
            setImage={setImage}
          />
        ))}
        {range(placeholderStartIndex, defaultCount).map((val) => (
          <ImageInput
            index={val}
            onDelete={onDelete}
            onChange={onChange}
            key={val}
            setImage={setImage}
          />
        ))}
      </StyledImageInputContainer>
    </>
  );
};

export default ImageInputContainer;
