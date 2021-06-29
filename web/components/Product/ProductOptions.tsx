import { generateRange } from '@utils/generateRange';
import { OptionsSwitch, ProductVariant } from '@utils/sanity/queries';
import React, { useMemo } from 'react';
import SelectBlock from '@components/Select/SelectBlock';
import { useWhichProduct } from './useWhichProduct';

interface Props {
  variants: ProductVariant[];
  optionsSwitch: OptionsSwitch;
  defaultVariant: ProductVariant;
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

const getDefaultOption = (variant: ProductVariant, keys: string[], size?: number) => {
  const map: Record<string, any> = {};
  Object.entries(variant).forEach(([key, val]) => {
    if (keys.includes(key)) {
      map[key] = val;
    }
  });

  if (size) {
    map.size = size;
  }

  return map;
};
const getPossibleSizes = (variants: ProductVariant[]) => {
  let min = 100;
  let max = 0;
  let hasHalfSizes = false;
  variants.forEach((v) => {
    if (v.hasHalfSizes) {
      hasHalfSizes = true;
    }
    min = Math.min(v.minSize || 100, min);
    max = Math.max(v.maxSize || 0, max);
  });
  return generateRange(min, max, hasHalfSizes ? 0.5 : 1);
};

const ProductOptions = ({ variants, optionsSwitch, defaultVariant }: Props) => {
  const options = useMemo(() => {
    return getValues(variants, ['color', 'additional', 'letters']);
  }, [variants]);

  const defaultOption = useMemo(
    () =>
      getDefaultOption(defaultVariant, ['color', 'additional', 'letters'], defaultVariant.minSize),
    [defaultVariant],
  );

  const sizes = useMemo(
    () => (optionsSwitch.withSize ? getPossibleSizes(variants) : null),
    [variants, optionsSwitch.withSize],
  );
  const { handleSelectChange } = useWhichProduct(defaultOption, variants);

  return (
    <>
      {Object.entries(options).map(([key, values]) => {
        if (key === 'additional') {
          // Make additional fields go last
          return null;
        }
        return (
          <SelectBlock
            label={key === 'color' ? 'Color/Material' : key}
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
          label={optionsSwitch.additionalName || 'Addtional'}
          options={options.additional.map((val) => ({ label: val, value: val }))}
          initialValue={{ label: options.additional[0], value: options.additional[0] }}
          onChange={(val) => handleSelectChange(val, 'additional')}
        />
      )}
    </>
  );
};

export default ProductOptions;
