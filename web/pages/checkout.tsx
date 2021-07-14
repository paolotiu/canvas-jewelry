import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import Checkout from '@components/Checkout/Checkout';
import { commerce } from '@utils/commerce/commerce';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

const CheckoutPage = ({
  cart,
  checkout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Checkout cart={cart} checkout={checkout} />;
};

export const getServerSideProps: GetServerSideProps<{ cart: Cart; checkout: CheckoutToken }> =
  async ({ req }) => {
    const { commercejs_cart_id } = req.cookies;
    try {
      const cart = await commerce.cart.retrieve(commercejs_cart_id);

      const checkout = await commerce.checkout.generateTokenFrom('cart', cart.id || '');

      return {
        props: {
          cart,
          checkout,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };

export default CheckoutPage;
