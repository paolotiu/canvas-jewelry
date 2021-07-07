import { theme } from '@styles/theme';
import { GroupTypeBase, Styles, Theme } from 'react-select';

export const customStyles: Styles<
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

export const getTheme = (selectTheme: Theme) => ({
  ...selectTheme,
  borderRadius: 0,
  colors: {
    ...selectTheme.colors,
    primary: theme.colors.blackAlpha['200'],
    primary50: theme.colors.blackAlpha['100'],
  },
});
