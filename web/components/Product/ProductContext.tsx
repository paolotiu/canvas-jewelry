import { ProductVariant } from '@utils/sanity/queries';
import React, { useState, createContext, useContext } from 'react';

const ProductContext = createContext<{
  variant: ProductVariant | null;
  setVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>;
}>({
  variant: null,
  setVariant: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const useProductContext = () => useContext(ProductContext);
export const ProductContextProvider = ({ children }: Props) => {
  const [variant, setVariant] = useState<ProductVariant | null>(null);

  return (
    <ProductContext.Provider value={{ variant, setVariant }}>{children}</ProductContext.Provider>
  );
};
