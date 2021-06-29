import { useEffect, useState } from 'react';

export const useModal = (initial = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initial);

  useEffect(() => {
    setIsModalOpen(initial);
  }, [initial]);
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
