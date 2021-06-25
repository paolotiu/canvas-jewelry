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
  control: (provided) => ({ ...provided, borderRadius: 0 }),
  container: (provided) => ({ ...provided, borderRadius: 0 }),
  menu: (provided) => ({ ...provided, borderRadius: 0 }),
};

const Select = (props: SelectProps) => {
  return <ReactSelect styles={customStyles} {...props} />;
};

export default Select;
