import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createOpenHandler = (cb: () => void) => {
    cb();
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, createOpenHandler, closeModal, openModal };
};
