import { useState } from 'react';

interface UseQuantityOptions {
  min?: number;
  max?: number;
}
export const useQuantity = (initial = 0, options?: UseQuantityOptions) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    setQuantity((prev) => Math.min(options?.max || 999999, prev + 1));
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(options?.min || 0, prev - 1));
  };

  return [quantity, { increment, decrement }] as const;
};
