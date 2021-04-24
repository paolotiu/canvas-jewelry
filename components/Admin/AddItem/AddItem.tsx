import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import Form from '@components/General/Form/Form';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { useForm } from '@utils/useForm';
import { useImages } from '@utils/useImages';
import axios from 'axios';
import React from 'react';

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
  const { inputs, handleChange } = useForm({ name: '', price: 0, description: '' });
  const { imagePaths, handleFileChange, getFormData } = useImages();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = getFormData(inputs);
    axios.post('/api/items', data);
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
          <Form.Input type="file" multiple onChange={handleFileChange} />
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
