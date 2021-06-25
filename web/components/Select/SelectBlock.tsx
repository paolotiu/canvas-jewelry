import styled from '@emotion/styled';
import { Props as SelectProps } from 'react-select';
import React, { useState } from 'react';

import Select from './Select';

interface Props {
  label: string;
  initialValue?: { label: string; value: string };
}

const StyledSelectBlock = styled.div`
  display: grid;
  gap: 0.2rem;

  .label {
    font-weight: bold;
    text-transform: capitalize;
  }
`;

const SelectBlock = ({ label, initialValue, onChange, ...props }: Props & SelectProps) => {
  const [selectValue, setSelectValue] = useState(initialValue);

  return (
    <StyledSelectBlock>
      <p className="label">{label}</p>
      <Select
        {...props}
        value={selectValue}
        onChange={(val, action) => {
          if (val) {
            setSelectValue(val);
          }

          if (onChange) {
            onChange(val, action);
          }
        }}
      />
    </StyledSelectBlock>
  );
};

export default SelectBlock;
