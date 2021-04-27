import styled from '@emotion/styled';
import { useRef } from 'react';
import * as React from 'react';
import Button from '../Button';

interface ImageSquareProps {
  src?: string;
}

const DeleteButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  padding: 0;
`;
const ImageSquare = styled.div<ImageSquareProps>`
  position: relative;
  --size: 100px;
  width: var(--size);
  height: var(--size);
  cursor: ${({ src }) => (src ? 'move' : 'pointer')};
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};

  input {
    display: none;
  }
`;

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  src?: string;

  index: number;
  onDeleteClick: (e: any, index: number) => void;
}

const ImageInput = ({ onChange, multiple = true, src, index, onDeleteClick }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <ImageSquare
        role="button"
        tabIndex={0}
        className="image-square"
        onClick={() => {
          if (ref.current && !src) {
            ref.current.click();
          }
        }}
        src={src}
        draggable
        onDragEnd={(e) => {
          const { clientX: x, clientY: y } = e;

          console.log(document.elementFromPoint(x, y)?.className);
        }}
      >
        {src && (
          <DeleteButton
            backgroundColor="inactiveTransparent"
            borderRadius="full"
            size="sm"
            onClick={(e) => {
              onDeleteClick(e, index);
            }}
          >
            X
          </DeleteButton>
        )}
        <input type="file" accept="image/*" onChange={onChange} ref={ref} multiple={multiple} />
      </ImageSquare>
    </>
  );
};

// const event = new Event('change', { bubbles: true, cancelable: false });
//             ref.current?.dispatchEvent(event)
export default ImageInput;
