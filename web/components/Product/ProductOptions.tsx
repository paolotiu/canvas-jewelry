import { generateRange } from '@utils/generateRange';
import { ProductVariant } from '@utils/sanity/queries';
import React, { useMemo } from 'react';
import SelectBlock from '@components/Select/SelectBlock';
import { useWhichProduct } from './useWhichProduct';

interface Props {
  variants: ProductVariant[];
  withSize: boolean;
}

const getValues = (variants: ProductVariant[], keys: string[]) => {
  const map: Record<string, any[]> = {};
  variants.forEach((v) => {
    Object.entries(v).forEach(([key, val]) => {
      if (keys.includes(key)) {
        if (!map[key]?.length) {
          // In the first iteration, initialize an array
          map[key] = [val];
        } else {
          // Remove dupes
          map[key] = new Array(...new Set([...map[key], val]));
        }
      }
    });
  });
  return map;
};

const getPossibleSizes = (variants: ProductVariant[]) => {
  let min = 0;
  let max = 100;
  let hasHalfSizes = false;
  variants.forEach((v) => {
    if (v.hasHalfSizes) {
      hasHalfSizes = true;
    }
    min = Math.min(v.minSize || 0);
    max = Math.max(v.maxSize || 0);
  });
  return generateRange(min, max, hasHalfSizes ? 0.5 : 0);
};

const ProductOptions = ({ variants, withSize }: Props) => {
  const options = useMemo(
    () => getValues(variants, ['color', 'additional', 'letters']),
    [variants],
  );
  const sizes = withSize ? getPossibleSizes(variants) : null;
  const { handleSelectChange } = useWhichProduct(options[0], variants);

  return (
    <>
      {Object.entries(options).map(([key, values]) => {
        if (key === 'additional') {
          // Make additional fields go last
          return null;
        }
        return (
          <SelectBlock
            label={key}
            options={values.map((v) => ({ label: v, value: v }))}
            key={key}
            onChange={(val) => handleSelectChange(val, key)}
            initialValue={{ label: values[0], value: values[0] }}
          />
        );
      })}
      {sizes?.length ? (
        <SelectBlock
          label="Size"
          options={sizes.map((size) => ({ label: String(size), value: String(size) }))}
          initialValue={{ label: String(sizes[0]), value: String(sizes[0]) }}
          onChange={(val) => handleSelectChange(val, 'size', 'number')}
        />
      ) : null}
      {options.additional && (
        <SelectBlock
          label="Additional"
          options={options.additional.map((val) => ({ label: val, value: val }))}
          initialValue={{ label: options.additional[0], value: options.additional[0] }}
          onChange={(val) => handleSelectChange(val, 'additional')}
        />
      )}
    </>
  );
};

export default ProductOptions;
