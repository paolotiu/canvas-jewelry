import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import * as React from 'react';
import Button from '../Button';

const CropperModal = dynamic(() => import('@components/CropperModal/CropperModal'));

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
  margin: 10px;

  input {
    display: none;
  }
`;

export interface ImageInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  src?: string;
  setImage: (index: number, file: File) => void;
  index: number;
  onDelete: (e: any, index: number) => void;
}

const ImageInput = ({
  onChange,
  multiple = true,
  src,
  index,
  onDelete,
  setImage,
}: ImageInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
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
      >
        {src && (
          <>
            <DeleteButton
              backgroundColor="inactiveTransparent"
              borderRadius="full"
              size="sm"
              onClick={(e) => {
                onDelete(e, index);
              }}
            >
              X
            </DeleteButton>
            <button type="button" onClick={openModal}>
              Edit
            </button>
          </>
        )}
        {src && (
          <CropperModal
            src={src}
            setImage={setImage}
            index={index}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            closeModal={closeModal}
          />
        )}
        <input type="file" accept="image/*" onChange={onChange} ref={ref} multiple={multiple} />
      </ImageSquare>
    </>
  );
};

// const event = new Event('change', { bubbles: true, cancelable: false });
//             ref.current?.dispatchEvent(event)
export default ImageInput;
