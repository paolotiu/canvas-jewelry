import { theme } from '@styles/theme';
import { Cropper } from 'react-cropper';
import Modal from 'react-modal';
import { useState } from 'react';
import styled from '@emotion/styled';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';
import Button from '@components/General/Button';
import { breakpoints } from '@styles/breakpoints';

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  h3 {
    font-weight: ${({ theme: { typography } }) => typography.fontWeights.medium};
    font-size: ${({ theme: { typography } }) => typography.fontSizes['2xl']};
    color: ${({ theme: { colors } }) => colors.headerText};
  }
`;

const CropperWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const CropperPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme: { colors } }) => colors.secondaryText};
  span {
    font-size: ${({ theme: { typography } }) => typography.fontSizes.sm};
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin: 0 5px;
  }
`;

const modalStyles: Modal.Styles = {
  overlay: {
    backgroundColor: theme.colors.blackAlpha[500],
  },
  content: {
    transform: 'translate(-50%,-50%)',
    inset: '50% auto auto 50%',
  },
};

Modal.setAppElement('#__next');

interface Props extends Modal.Props {
  src: string;
  index: number;
  setImage: (index: number, file: File) => void;
  closeModal: () => void;
}

const StyledCropper = styled(Cropper)`
  width: 200px;
  ${breakpoints.xs} {
    width: 400px;
  }
`;

const CropperModal = ({ src, setImage, index, closeModal, ...rest }: Props) => {
  const [cropper, setCropper] = useState<any>();
  const onSubmit = () => {
    (cropper.getCroppedCanvas() as HTMLCanvasElement).toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], 'cropper', { type: 'image/jpeg' });
          setImage(index, file);
        }
      },

      'image/jpeg',
    );
  };
  return (
    <Modal style={modalStyles} {...rest}>
      <Wrapper>
        <h3>Edit Product Image</h3>
        <CropperWrapper>
          <StyledCropper
            src={src}
            guides
            autoCropArea={1}
            aspectRatio={1 / 1}
            viewMode={2}
            preview=".img-preview"
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />

          <CropperPreview>
            <span>Preview</span>
            <div
              className="img-preview"
              style={{ width: '100px', height: '100px', overflow: 'hidden' }}
            />
          </CropperPreview>
        </CropperWrapper>

        <ActionsWrapper>
          <Button
            size="md"
            withBorder="secondaryText"
            borderRadius="sm"
            onClick={() => cropper.reset()}
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            size="md"
            backgroundColor="success"
            isWhite
            withBorder
            borderRadius="sm"
            fontWeight="bold"
          >
            Save
          </Button>
        </ActionsWrapper>
      </Wrapper>
    </Modal>
  );
};

export default CropperModal;
