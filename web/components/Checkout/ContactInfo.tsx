import Input from '@components/Common/Input/Input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Container, InputsContainer, SplitInput } from './InputHelpers';

export interface ContactInfoValues {
  email: string;
  firstName: string;
  lastName: string;
}
const ContactInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactInfoValues>();

  return (
    <Container>
      <h3>Contact Info</h3>
      <InputsContainer>
        <SplitInput>
          <Input
            type="text"
            label="First Name*"
            {...register('firstName', { required: 'First Name is required' })}
            isError={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <Input
            type="text"
            label="Last Name*"
            {...register('lastName', { required: 'Last Name is required' })}
            isError={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
        </SplitInput>

        <Input
          type="email"
          label="Email*"
          {...register('email', { required: 'Email is required' })}
          isError={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </InputsContainer>
    </Container>
  );
};

export default ContactInfo;
