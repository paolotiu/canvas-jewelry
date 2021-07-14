import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '@components/Layout';
import Button from '@components/Common/Button/Button';
import { breakpoints } from '@styles/breakpoints';
import { Cart } from '@chec/commerce.js/types/cart';
import { paymongo } from '@utils/paymongo/paymongo';
import { PaymentIntentStatus } from '@paymongo/core';
import ContactInfo, { ContactInfoValues } from './ContactInfo';
import ShippingAddress, { ShippingAddressValues } from './ShippingAddress';
import CartPreview from './CartPreview';
import PaymentInfo, { PaymentInfoValues } from './PaymentInfo';
import SecureAuthModal from './SecureAuthModal';
import { useCheckout } from './useCheckout';
import SuccessScreen from './SuccessScreen';

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  gap: 2rem;
  ${breakpoints.md} {
    padding: 2rem;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
  }
`;
const StyledForm = styled.form`
  padding: 1rem;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;

  > div {
    :not(:first-of-type) {
      margin-top: 2rem;
    }
  }
`;

const ProceedButton = styled(Button)`
  margin-top: 2rem;
  padding: 1rem;
  max-height: 58px;
`;

interface FormValues extends ContactInfoValues, ShippingAddressValues, PaymentInfoValues {}

interface Props {
  cart: Cart;
  checkout: CheckoutToken;
}

const Checkout = ({ checkout }: Props) => {
  const methods = useForm<FormValues>();

  const {
    setCapture,
    setPaymentIntent,
    setPaymentMethod,
    captureRef,
    paymentIntentRef,
    paymentMethodRef,
  } = useCheckout();

  const [currentStatus, setCurrentStatus] = useState<PaymentIntentStatus>('processing');
  const [modalOptions, setModalOptions] = useState({ isOpen: false, src: '#' });

  const regionObject = methods.watch('region');

  let shippingCost: number | undefined;

  if (regionObject) {
    shippingCost = regionObject.value === '00' ? 80 : 180;
  }

  const onSubmit = async ({
    address,
    lastName,
    email,
    zipCode,
    firstName,
    cardNumber,
  }: FormValues) => {
    // Check if its a valid checkout
    if (!checkout) return;

    if (!captureRef.current) {
      await setCapture(checkout.id, {
        customer: {
          lastname: lastName,
          firstname: firstName,
          email,
        },
        line_items: checkout.live.line_items,
        shipping: {
          country: 'PH',
          postal_zip_code: zipCode,
          street: address,
        },
      });
    }
    if (!paymentIntentRef.current) {
      await setPaymentIntent({
        data: {
          attributes: {
            amount: (checkout.live.subtotal.raw + (shippingCost || 0)) * 100,
            currency: 'PHP',
            payment_method_allowed: ['card'],
            metadata: {
              orderId: captureRef.current?.id,
            },
          },
        },
      });
    }

    if (!paymentMethodRef.current) {
      await setPaymentMethod({
        data: {
          attributes: {
            type: 'card',
            details: {
              card_number: cardNumber.toString().replaceAll(' ', ''),
              exp_month: 10,
              exp_year: 2023,
              cvc: '192',
            },
          },
        },
      });
    }

    const {
      attributes: { status, next_action },
    } = await paymongo.paymentIntent.attach({
      id: paymentIntentRef.current?.id || '',
      data: {
        attributes: {
          payment_method: paymentMethodRef.current?.id || '',
          client_key: paymentIntentRef.current?.attributes.client_key || '',
        },
      },
    });

    if (status === 'awaiting_next_action') {
      setModalOptions({ isOpen: true, src: next_action?.redirect.url || '#' });
    }
  };

  if (currentStatus === 'succeeded') {
    return <SuccessScreen />;
  }

  return (
    <Layout>
      <Container>
        <FormProvider {...methods}>
          <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
            <ContactInfo />
            <ShippingAddress />
            <PaymentInfo />
            <ProceedButton
              type="submit"
              backgroundColor="black"
              color="white"
              size="md"
              fontWeight="bold"
            >
              Proceed to payment
            </ProceedButton>
          </StyledForm>
        </FormProvider>
        {checkout && <CartPreview checkout={checkout} shipping={shippingCost} />}
      </Container>
      <SecureAuthModal
        isOpen={modalOptions.isOpen}
        src={modalOptions.src}
        onComplete={async () => {
          const intent = await paymongo.paymentIntent.retrieve({
            client_key: paymentIntentRef.current?.attributes.client_key || '',
            id: paymentIntentRef.current?.id || '',
          });
          setCurrentStatus(intent.attributes.status);
        }}
      />
    </Layout>
  );
};

export default Checkout;
