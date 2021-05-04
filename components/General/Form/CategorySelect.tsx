import styled from '@emotion/styled';
import { apiHandler } from '@utils/apiHandler';
import { createCategory, getCategories } from '@utils/queries';
import { motion, Variants } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import ReactSelect, { OptionsType } from 'react-select';
import Button from '../Button';
import Form from './Form';

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

const CreateCategoryPopup = styled(motion.div)`
  z-index: 1;
  position: absolute;
  top: 110%;
  left: 0;
  padding: 0.2rem;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
`;

const PopupVariants: Variants = {
  hidden: {
    y: '-50%',
    pointerEvents: 'none',
    opacity: [1, 0, 0],
    transition: {
      times: [0, 0.2, 1],
    },
  },
  shown: {
    y: 0,
    pointerEvents: 'auto',
    opacity: 1,
  },
};

interface Props {
  value: OptionsType<{ label: string; value: string }>;
  onChange: (val: OptionsType<{ label: string; value: string }>) => void;
}

const CategorySelect = ({ value, onChange }: Props) => {
  const { data: categories, refetch } = useQuery('categories', getCategories);
  const [categoryName, setCategoryName] = useState('');
  const [willPopup, setWillPopup] = useState(false);

  // Memoized to prevent useless rerenders
  const closePopup = useCallback(() => {
    setWillPopup(false);
  }, []);

  useEffect(() => {
    // Add event listener to close popup on window click
    if (window) {
      window.addEventListener('click', closePopup);
    }

    return () => window.removeEventListener('click', closePopup);
  }, [closePopup]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const { error } = await apiHandler(createCategory(categoryName));
    if (error) {
      toast.error(error.message);
      return;
    }

    setCategoryName('');
    toast.success('Category created');
    // Refetch categories
    refetch();
  };

  return (
    <CategorySelectContainer>
      <CreateCategoryPopup
        onClick={(e) => e.stopPropagation()}
        variants={PopupVariants}
        initial="hidden"
        animate={willPopup ? 'shown' : 'hidden'}
      >
        <Form.FormControl>
          <label htmlFor="name">Category Name</label>
          <Form.Input
            type="text"
            name="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.FormControl>
        <Form.FormControl style={{ padding: `.2rem 1em 1rem 1em` }}>
          <Button
            onClick={handleSubmit}
            type="button"
            size="sm"
            backgroundColor="success"
            isWhite
            fontWeight="bold"
          >
            Create
          </Button>
        </Form.FormControl>
      </CreateCategoryPopup>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setWillPopup(true);
        }}
        type="button"
        size="sm"
        withBorder="gray"
        fontWeight="bold"
        color="coolGray"
        borderRadius="base"
        hoverColor="gray"
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      >
        Create Category
      </Button>
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
