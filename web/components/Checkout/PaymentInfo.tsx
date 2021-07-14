import Input from '@components/Common/Input/Input';
import React from 'react';

import { useFormContext } from 'react-hook-form';
import { Container, InputsContainer, SplitInput } from './InputHelpers';

export interface PaymentInfoValues {
  cardNumber: number;
  cvc: string;
  expMonth: number;
  expYear: number;
}

const createMaxLenghtInputHandler = (max: number) => (e: React.FormEvent<HTMLInputElement>) => {
  if (e.currentTarget.value.length > max) {
    e.currentTarget.value = e.currentTarget.value.slice(0, max);
  }
};

const PaymentInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PaymentInfoValues>();

  return (
    <Container>
      <h3>Payment Details</h3>
      <InputsContainer>
        <SplitInput gtc="5fr 1fr ">
          <Input
            type="text"
            label="Card Number"
            maxLength={19}
            onInput={(e) => {
              const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
              const onlyNumbers = e.currentTarget.value.replace(/[^\d]/g, '');

              const formatted = onlyNumbers.replace(regex, (_regex, $1, $2, $3, $4) =>
                [$1, $2, $3, $4].filter((group) => !!group).join(' '),
              );
              e.currentTarget.value = formatted;
            }}
            {...register('cardNumber', { required: 'Card Number is required' })}
            isError={!!errors.cardNumber}
            errorMessage={errors.cardNumber?.message}
          />
          <Input
            type="number"
            label="CVC"
            maxLength={3}
            onInput={createMaxLenghtInputHandler(3)}
            {...register('cvc', { required: 'Card cvc is required' })}
            isError={!!errors.cvc}
            errorMessage={errors.cvc?.message}
          />
        </SplitInput>

        <SplitInput gtc="1fr 1fr 3fr">
          <Input
            type="number"
            label="Exp. Month"
            placeholder="MM"
            maxLength={2}
            onInput={createMaxLenghtInputHandler(2)}
            {...register('expMonth', { required: 'Exp. Month is required' })}
            isError={!!errors.expMonth}
            errorMessage={errors.expMonth?.message}
          />
          <Input
            type="number"
            label="Exp. Year"
            maxLength={2}
            placeholder="YYYY"
            onInput={createMaxLenghtInputHandler(4)}
            {...register('expYear', { required: 'Exp. Year is required' })}
            isError={!!errors.expYear}
            errorMessage={errors.expYear?.message}
          />
        </SplitInput>
      </InputsContainer>
    </Container>
  );
};

export default PaymentInfo;
