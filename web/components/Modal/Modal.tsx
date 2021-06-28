import { theme } from '@styles/theme';
import React from 'react';
import ReactModal from 'react-modal';

export interface ModalProps extends ReactModal.Props {
  children: React.ReactNode;
}

const styles: ReactModal.Styles = {
  overlay: {
    zIndex: 20,
    backgroundColor: theme.colors.blackAlpha['300'],
  },
  content: {
    top: '10%',
    height: 'fit-content',
    width: 'fit-content',
    left: '50%',
    transform: 'translate(-50%, 0)',
    position: 'absolute',
    borderRadius: 0,
    maxWidth: '94vw',
    background: theme.colors.white,
  },
};

ReactModal.setAppElement('#__next');

const Modal = ({ children, style, ...props }: ModalProps) => {
  return (
    <ReactModal
      className={{
        base: 'react-modal',
        afterOpen: 'react-modal-after-open',
        beforeClose: 'react-modal-before-close',
      }}
      closeTimeoutMS={300}
      style={{ ...styles, ...style }}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
