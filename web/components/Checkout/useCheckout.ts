import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import {
  CreatePaymentIntentParams,
  CreatePaymentMethodParams,
  PaymentIntentResource,
  PaymentMethodResource,
} from '@paymongo/core';
import { commerce } from '@utils/commerce/commerce';
import { paymongo } from '@utils/paymongo/paymongo';
import { createPaymentIntent } from '@utils/paymongo/queries';
import { merge } from 'lodash';
import { useRef } from 'react';

export const useCheckout = () => {
  const captureRef = useRef<CheckoutCaptureResponse>();
  const paymentIntentRef = useRef<PaymentIntentResource>();
  const paymentMethodRef = useRef<PaymentMethodResource>();

  const setCapture = async (id: string, data: Omit<CheckoutCapture, 'payment'>) => {
    const defaultOptions: Pick<CheckoutCapture, 'payment'> = {
      payment: {
        gateway: 'manual',
        manual: {
          id: 'gway_jwOJ9GD9p1dpl4',
        },
      },
    };

    captureRef.current = await commerce.checkout.capture(id, merge({}, defaultOptions, data));
  };

  const setPaymentIntent = async (data: CreatePaymentIntentParams) => {
    paymentIntentRef.current = await createPaymentIntent(data);
  };

  const setPaymentMethod = async (data: CreatePaymentMethodParams) => {
    paymentMethodRef.current = await paymongo.paymentMethod.create(data);
  };

  return {
    setCapture,
    setPaymentIntent,
    setPaymentMethod,
    paymentIntentRef,
    captureRef,
    paymentMethodRef,
  };
};
