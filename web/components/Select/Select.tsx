import { theme } from '@styles/theme';
import ReactSelect, { GroupTypeBase, Styles, Props as SelectProps } from 'react-select';

const customStyles: Styles<
  {
    value: string;
    label: string;
  },
  false,
  GroupTypeBase<{
    value: string;
    label: string;
  }>
> = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    border: `1px solid ${theme.colors.gray}`,
  }),
  container: (provided) => ({ ...provided }),
  option: (provided, { isFocused }) => ({
    ...provided,
    color: theme.colors.black,
    background: isFocused ? theme.colors.blackAlpha['200'] : 'none',
  }),
  menu: (provided) => ({ ...provided, borderRadius: 0 }),
};

const Select = ({ options, ...props }: SelectProps) => {
  return (
    <ReactSelect
      styles={customStyles}
      instanceId={options?.[0].label || 1}
      options={options}
      isSearchable={false}
      theme={(selectTheme) => ({
        ...selectTheme,
        borderRadius: 0,
        colors: {
          ...selectTheme.colors,
          primary: theme.colors.blackAlpha['200'],
          primary50: theme.colors.blackAlpha['100'],
        },
      })}
      {...props}
    />
  );
};

export default Select;
