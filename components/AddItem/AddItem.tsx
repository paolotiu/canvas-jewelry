import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import Form from '@components/General/Form';
import FormControl from '@components/General/FormControl';
import Input from '@components/General/Input';
import TextArea from '@components/General/TextArea';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { useForm } from '@utils/useForm';
import axios from 'axios';
import React, { useState } from 'react';

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
  const [images, setImages] = useState<FileList | null>();
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    setImages(files);
    if (files) {
      setImagePaths(Array.from(files).map((file) => URL.createObjectURL(file)));
    } else {
      setImagePaths([]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    // Append inputs to form
    Object.entries(inputs).forEach(([key, val]) => {
      data.append(key, String(val));
    });

    // Append images
    if (images) {
      Array.from(images).forEach((image, i) => {
        data.append(`image_${i}`, image);
      });
    }

    axios.post('/api/items', data);
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FormHeader> CREATE ITEM</FormHeader>
        <div className="short-inputs">
          <FormControl>
            <label htmlFor="name">Name:</label>
            <Input
              type="text"
              value={inputs.name}
              onChange={handleChange}
              name="name"
              placeholder="Item Name"
            />
          </FormControl>

          <FormControl>
            <label htmlFor="price">Price:</label>
            <Input
              type="number"
              value={inputs.price}
              onChange={handleChange}
              min={0}
              name="price"
              placeholder="Item Price"
            />
          </FormControl>
        </div>
        <FormControl>
          <label htmlFor="description">Description:</label>
          <TextArea
            rows={10}
            style={{ resize: 'none' }}
            value={inputs.description}
            name="description"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="photos">Photos</label>
          <Input type="file" multiple onChange={handleFileChange} />
          <Carousel withButtons images={imagePaths} />
        </FormControl>
        <FormControl>
          <Button type="submit" size="lg" primary>
            Create Item
          </Button>
        </FormControl>
      </Form>
    </Wrapper>
  );
};

export default AddItem;
