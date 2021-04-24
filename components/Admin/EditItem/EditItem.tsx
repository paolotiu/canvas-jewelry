import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import Form from '@components/General/Form/Form';
import styled from '@emotion/styled';
import { ItemInterface } from '@models/Item';
import { breakpoints } from '@styles/breakpoints';
import { useForm } from '@utils/useForm';
import { useImages } from '@utils/useImages';
import React from 'react';

interface Props {
  item: ItemInterface;
}

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: grid;

  width: 100%;
  max-width: 1080px;
  grid-template-columns: 1fr;

  .constants {
    padding: 1em;
    grid-row-start: 1;
  }

  ${breakpoints.md} {
    grid-template-columns: 2fr 1fr;
    .constants {
      grid-row-start: unset;
    }
  }
`;

const Input = styled(Form.Input)``;

const EditItem = ({ item }: Props) => {
  const { handleFileChange, imagePaths } = useImages(item.images);

  const { inputs, handleChange } = useForm({
    name: item.name,
    description: item.description,
    price: item.price,
  });

  return (
    <FlexCenter as="main">
      <Wrapper>
        <Form>
          <Form.FormControl>
            <label htmlFor="name">Name</label>
            <Input type="text" value={inputs.name} name="name" onChange={handleChange} />
          </Form.FormControl>
          <Form.FormControl>
            <label htmlFor="price">Price</label>
            <Input type="number" value={inputs.price} name="price" onChange={handleChange} />
          </Form.FormControl>
          <Form.FormControl>
            <label htmlFor="description">Description</label>
            <Form.TextArea value={inputs.description} name="description" onChange={handleChange} />
          </Form.FormControl>
          <Form.FormControl>
            <label htmlFor="photos">Photos</label>
            <Input type="file" multiple name="photos" onChange={handleFileChange} />
            <Carousel images={imagePaths} withButtons />
          </Form.FormControl>
          <Form.FormControl>
            <Button
              type="button"
              style={{ maxWidth: `300px` }}
              backgroundColor="neutral"
              isWhite
              borderRadius="lg"
            >
              Save Changes
            </Button>
          </Form.FormControl>
        </Form>
        <div className="constants">
          <Form.FormControl>
            <label htmlFor="id">Item ID</label>
            <Input value={item._id} name="id" readOnly disabled />
          </Form.FormControl>
        </div>
      </Wrapper>
    </FlexCenter>
  );
};

export default EditItem;
