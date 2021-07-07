import ReactSelect, { Props as SelectProps } from 'react-select';
import { customStyles, getTheme } from './customStyles';

const Select = ({ options, ...props }: SelectProps) => {
  return (
    <ReactSelect
      styles={customStyles}
      instanceId={options?.[0].label || 1}
      options={options}
      isSearchable={false}
      theme={getTheme}
      {...props}
    />
  );
};

export default Select;
