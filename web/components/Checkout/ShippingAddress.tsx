import Input from '@components/Common/Input/Input';
import AsyncSelect from '@components/Select/AsyncSelect';
import styled from '@emotion/styled';
import { commerce } from '@utils/commerce/commerce';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SplitInput, Container as GenericContainer, InputsContainer } from './InputHelpers';

const Container = styled(GenericContainer)`
  .select {
    margin-top: 0.15rem;
  }

  label {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`;

const getSubdivisions = () => {
  return commerce.services.localeListSubdivisions('PH');
};

export interface ShippingAddressValues {
  address: string;
  country: string;
  zipCode: string;
  region: { label: string; value: string };
}

const ShippingAddress = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ShippingAddressValues>();
  return (
    <Container>
      <h3>Shipping Address</h3>
      <InputsContainer>
        <Input
          type="address"
          label="Address*"
          {...register('address', { required: 'Address is requied' })}
          errorMessage={errors.address?.message}
          isError={!!errors.address}
        />
        <Input
          type="text"
          label="Country"
          {...register('country', { value: 'Philippines' })}
          readOnly
        />

        <SplitInput gtc="4fr minmax(30px,100px)">
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
            <label htmlFor="region">Region</label>

            <Controller
              name="region"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AsyncSelect
                  className="select"
                  inputId="region"
                  loadOptions={() =>
                    getSubdivisions().then((res) => {
                      const subs = Object.entries(res.subdivisions).map(([key, name]) => {
                        return {
                          label: name,
                          value: key,
                        };
                      });
                      return [{ label: 'Metro Manila', value: '00' }, ...subs];
                    })
                  }
                  {...field}
                />
              )}
            />
          </div>
          <Input
            type="text"
            label="Zip Code"
            {...register('zipCode', { required: 'Zip code is required' })}
            errorMessage={errors.zipCode?.message}
            isError={!!errors.zipCode}
          />
        </SplitInput>
      </InputsContainer>
    </Container>
  );
};

export default ShippingAddress;
