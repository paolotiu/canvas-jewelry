import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import Form from '@components/General/Form/Form';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { useForm } from '@utils/useForm';
import { useImages } from '@utils/useImages';
import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';

const AddItemSchema = yup.object().shape({
  name: yup.string().required().max(70),
  price: yup.number().typeError('price must be a number').required(),
  description: yup.string(),
});

const Wrapper = styled.div`
  padding: 100px 5px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  ${breakpoints.md} {
    padding: 100px 10em;
  }
  form {
    width: 100%;
    max-width: 1000px;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.light};
`;

const AddItem = () => {
  const { inputs, handleChange, clearForm, errors, isError } = useForm(
    { name: '', price: 0, description: '' },
    AddItemSchema,
  );
  const { imagePaths, handleFileChange, getFormData, clearImages } = useImages();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (isError) return;
    const data = getFormData(inputs);

    try {
      await axios.post('/api/items', data);
      clearImages();
      clearForm();
    } catch (err) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} withBorder>
        <FormHeader> CREATE ITEM</FormHeader>
        <div className="short-inputs">
          <Form.FormControl>
            <label htmlFor="name">Name</label>
            <Form.Input
              type="text"
              value={inputs.name}
              onChange={handleChange}
              name="name"
              placeholder="Item Name"
            />
            <Form.ErrorText text={errors.name.message} willShow={hasSubmitted} />
          </Form.FormControl>

          <Form.FormControl>
            <label htmlFor="price">Price</label>
            <Form.Input
              type="number"
              value={inputs.price}
              onChange={handleChange}
              min={0}
              name="price"
              placeholder="Item Price"
            />

            <Form.ErrorText text={errors.price.message} willShow={hasSubmitted} />
          </Form.FormControl>
        </div>
        <Form.FormControl>
          <label htmlFor="description">Description</label>
          <Form.TextArea
            rows={10}
            style={{ resize: 'none' }}
            value={inputs.description}
            name="description"
            onChange={handleChange}
          />
        </Form.FormControl>
        <Form.FormControl>
          <label htmlFor="photos">Photos</label>
          <Form.Input type="file" multiple onChange={handleFileChange} accept="image/*" />
          <Carousel withButtons images={imagePaths} />
        </Form.FormControl>
        <Form.FormControl>
          <Button type="submit" size="lg" backgroundColor="black" withBorder isWhite>
            Create Item
          </Button>
        </Form.FormControl>
      </Form>
    </Wrapper>
  );
};

export default AddItem;
