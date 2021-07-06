import { commerce } from '@utils/commerce/commerce';
import { cartAtom } from '@utils/jotai';
import { useAtom } from 'jotai';

export const useCart = (id: string) => {
  const [cart, setCart] = useAtom(cartAtom);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    const res = await commerce.cart.update(itemId, { quantity });
    setCart(res.cart);
  };

  const handleItemRemove = async () => {
    const res = await commerce.cart.remove(id);
    setCart(res.cart);
  };

  const triggerFetching = () => {
    setCart('fetch');
  };

  return [
    cart,
    {
      handleItemRemove,
      handleQuantityChange,
      triggerFetching,
      setCart,
    },
  ] as const;
};
