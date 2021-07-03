import { useState } from 'react';

export const useOpenClose = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };

  return [isOpen, { close, open }] as const;
};
