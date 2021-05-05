import styled from '@emotion/styled';
import { apiHandler } from '@utils/apiHandler';
import { createCategory } from '@utils/queries';
import { motion, Variants } from 'framer-motion';
import React, { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '../Button';
import Form from './Form';

const Container = styled.div`
  position: relative;
`;

interface StyledCreateCategoryPopupProps {
  direction?: 'left' | 'right';
  noBorderRadiusRight?: boolean;
}

const StyledCreateCategoryPopup = styled(motion.div)<StyledCreateCategoryPopupProps>`
  z-index: 1;
  position: absolute;
  top: 110%;
  ${({ direction = 'right' }) => (direction === 'left' ? `right: 0` : `left: 0`)};
  padding: 0.2rem;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  pointer-events: none;
  opacity: 0;
  ~ button {
    height: 100%;
    ${({ noBorderRadiusRight: noBorderRight }) =>
      noBorderRight && `border-top-right-radius: 0px; border-bottom-right-radius: 0px;`}
  }
`;
const PopupVariants: Variants = {
  hidden: {
    y: '-50%',
    pointerEvents: 'none',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  shown: {
    y: 0,
    pointerEvents: 'auto',
    opacity: 1,
  },
};

interface Props extends StyledCreateCategoryPopupProps {
  onSubmit?: () => void;
}

const CreateCategoryPopup = ({ onSubmit, noBorderRadiusRight, direction }: Props) => {
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
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <Container>
      <StyledCreateCategoryPopup
        onClick={(e) => e.stopPropagation()}
        variants={PopupVariants}
        initial="hidden"
        animate={willPopup ? 'shown' : 'hidden'}
        noBorderRadiusRight={noBorderRadiusRight}
        direction={direction}
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
      </StyledCreateCategoryPopup>
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
      >
        Create Category
      </Button>
    </Container>
  );
};

export default CreateCategoryPopup;
