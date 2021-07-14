import Modal from '@components/Modal/Modal';
import React, { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onComplete: () => void;
  src: string;
}

const SecureAuthModal = ({ isOpen, onComplete, src }: Props) => {
  useEffect(() => {
    const listener = (e: MessageEvent<any>) => {
      if (e.data === '3DS-authentication-complete') {
        onComplete();
      }
    };
    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  });

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: '100vw',
          height: '100vh',
        },
      }}
    >
      <iframe
        style={{ width: '100%', height: '100%' }}
        title="3D Secure Authentication"
        src={src}
      />
    </Modal>
  );
};

export default SecureAuthModal;
