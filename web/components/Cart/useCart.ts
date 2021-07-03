import { cartAtom } from '@utils/jotai';
import { useAtom } from 'jotai';

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const changeQuantity =
    (type: 'add' | 'subtract', configId: string, removeOnZero = true) =>
    () => {
      setCart((prev) => {
        const clone = [...prev];
        const item = clone.find((x) => x.configId === configId);
        if (!item) {
          return clone;
        }

        if (type === 'add') {
          item.quantity += 1;
        } else if (type === 'subtract') {
          if (item.quantity === 1 && removeOnZero) {
            return clone.filter((x) => x.configId !== configId);
          }

          item.quantity -= 1;
        }
        return clone;
      });
    };

  const setQuantity = (quantity: number, configId: string) => {
    setCart((prev) => {
      const clone = [...prev];
      const item = clone.find((x) => x.configId === configId);
      if (item) {
        item.quantity = quantity;
      }
      return clone;
    });
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((x) => x.configId !== id));
  };

  return [cart, { changeQuantity, removeFromCart, setQuantity }] as const;
};
