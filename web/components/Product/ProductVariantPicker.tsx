import SelectBlock from '@components/Select/SelectBlock';
import styled from '@emotion/styled';
import { CommerceVariantGroups } from '@utils/commerce/commerce';
import React from 'react';

const ProductVariantPickerContainer = styled.div`
  padding: 1rem 0;
  display: grid;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;
interface Props {
  variantGroups: CommerceVariantGroups;
  defaultValues: Record<string, string>;
  handleSelectChange: (
    val: { label: string; value: string } | null,
    variantGroupId: string,
  ) => void;
}

const ProductVariantPicker = ({
  defaultValues = {},
  variantGroups = [],
  handleSelectChange,
}: Props) => {
  return (
    <ProductVariantPickerContainer>
      {variantGroups.map(({ name, options, id }) => {
        const defaultValue = defaultValues[id]
          ? {
              label: options.find((opt) => opt.id === defaultValues[id])?.name || '',
              value: defaultValues[id],
            }
          : null;

        return (
          <SelectBlock
            label={name}
            options={options.map((o) => ({ label: o.name, value: o.id }))}
            key={id}
            onChange={(val) => {
              handleSelectChange(val, id);
            }}
            defaultValue={defaultValue}
          />
        );
      })}
    </ProductVariantPickerContainer>
  );
};

export default ProductVariantPicker;
