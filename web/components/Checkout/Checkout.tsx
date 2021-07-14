import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '@components/Layout';
import Button from '@components/Common/Button/Button';
import { breakpoints } from '@styles/breakpoints';
import { Cart } from '@chec/commerce.js/types/cart';
import { paymongo } from '@utils/paymongo/paymongo';
import ContactInfo, { ContactInfoValues } from './ContactInfo';
import ShippingAddress, { ShippingAddressValues } from './ShippingAddress';
import CartPreview from './CartPreview';
import PaymentInfo, { PaymentInfoValues } from './PaymentInfo';
import SecureAuthModal from './SecureAuthModal';
import { useCheckout } from './useCheckout';

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

  const { setCapture, capture, setPaymentIntent, paymentIntent, paymentMethod, setPaymentMethod } =
    useCheckout();

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

    if (!capture) {
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
    if (!paymentIntent) {
      await setPaymentIntent({
        data: {
          attributes: {
            amount: 100 * 100,
            currency: 'PHP',
            payment_method_allowed: ['card'],
            metadata: {
              orderId: capture?.id,
            },
          },
        },
      });
    }

    if (!paymentMethod) {
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
      id: paymentIntent?.id || '',
      data: {
        attributes: {
          payment_method: paymentMethod?.id || '',
          client_key: paymentIntent?.attributes.client_key || '',
        },
      },
    });

    if (status === 'awaiting_next_action') {
      setModalOptions({ isOpen: true, src: next_action?.redirect.url || '#' });
    }
  };

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
        onComplete={() => console.log('complete')}
      />
    </Layout>
  );
};

export default Checkout;
