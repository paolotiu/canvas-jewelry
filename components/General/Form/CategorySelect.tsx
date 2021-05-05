import styled from '@emotion/styled';
import { getCategories } from '@utils/queries';
import { useQuery } from 'react-query';
import ReactSelect, { OptionsType } from 'react-select';
import CreateCategoryPopup from './CreateCategoryPopup';

const CategorySelectContainer = styled.div`
  display: flex;
  position: relative;
  .react-select {
    flex: 1;
    > div {
      border-left: 0;
      border-color: ${({ theme }) => theme.colors.gray};
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
`;

interface Props {
  value: OptionsType<{ label: string; value: string }>;
  onChange: (val: OptionsType<{ label: string; value: string }>) => void;
}

const CategorySelect = ({ value, onChange }: Props) => {
  const { data: categories, refetch } = useQuery('categories', getCategories);

  return (
    <CategorySelectContainer>
      <CreateCategoryPopup onSubmit={refetch} noBorderRadiusRight direction="right" />

      <ReactSelect
        className="react-select"
        instanceId="react-select"
        value={value}
        options={categories?.map((cat) => ({ label: cat.name, value: cat._id }))}
        onChange={onChange}
        isMulti
      />
    </CategorySelectContainer>
  );
};

export default CategorySelect;
