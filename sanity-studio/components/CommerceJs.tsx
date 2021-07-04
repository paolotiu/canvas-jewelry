import React, { useCallback, useEffect } from 'react';
import Commerce from '@chec/commerce.js';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(value));

const commerce = new Commerce(
  'pk_2982681b2d503b999b1e73784fa635e8fd2c7e1bde13f',
  true
);

const mapToSelectOptions = (data) => {
  return data.map((product) => ({
    ...product,
    label: product.name,
    value: product.id,
  }));
};

const loadOptions = debounce((inputValue, callback) => {
  if (inputValue) {
    commerce.products
      .list({ query: inputValue })
      .then((res) => callback(mapToSelectOptions(res.data)));
  } else {
    commerce.products
      .list()
      .then((res) => callback(mapToSelectOptions(res.data)));
  }
}, 500);

const CommerceJs = ({ type, value, markers, level, onChange }: any) => {
  const handleChange = (values) => {
    onChange(createPatchFrom(values));
  };

  const { title, description } = type;

  return (
    <Fieldset
      legend={title}
      description={description}
      markers={markers}
      level={level}
    >
      <AsyncSelect
        key={JSON.stringify(value)}
        value={value}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions as any}
        onChange={handleChange}
      />
    </Fieldset>
  );
};

export default CommerceJs;
