import Carousel from '@components/Carousel/Carousel';
import Button from '@components/General/Button';
import Form from '@components/General/Form/Form';
import Layout from '@components/Admin/Layout/Layout';
import styled from '@emotion/styled';
import { ItemInterface } from '@models/Item';
import { breakpoints } from '@styles/breakpoints';
import { softDeleteItem, updateItem } from '@utils/queries';
import { useForm } from '@utils/useForm';
import { useImages } from '@utils/useImages';
import { useRouter } from 'next/router';
import React from 'react';
import { apiHandler } from '@utils/apiHandler';
import { ItemSchema } from '@utils/validationSchemas';
import isMatch from 'lodash.ismatch';
import toast, { Toaster } from 'react-hot-toast';

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled(Button)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};

  :hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
  }
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

interface Props {
  item: ItemInterface;
  refetch: () => void;
}

const EditItem = ({ item, refetch }: Props) => {
  const router = useRouter();
  const { handleFileChange, imagePaths, getFormData } = useImages(item.images);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { inputs, handleChange, isError, errors, setErrors } = useForm(
    {
      name: item.name,
      description: item.description,
      price: item.price,
    },
    ItemSchema,
  );

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await softDeleteItem(item._id);
    router.push('/admin/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // SKip network call if nothing changes
    if (isError || isMatch(item, inputs)) {
      return;
    }

    const data = getFormData(inputs);
    const res = await apiHandler(updateItem(item._id, data));
    if (res.error) {
      setErrors((prev) => ({
        ...prev,
        name: {
          errors: ['Conflict Error'],
          message: res.error.message,
        },
      }));

      return;
    }

    toast.success('Updated item');
    refetch();
  };

  return (
    <Layout>
      <FlexCenter>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Form.FormControl>
              <label htmlFor="name">Name</label>
              <Input type="text" value={inputs.name} name="name" onChange={handleChange} />
              <Form.ErrorText text={errors.name.message} />
            </Form.FormControl>
            <Form.FormControl>
              <label htmlFor="price">Price</label>
              <Input type="number" value={inputs.price} name="price" onChange={handleChange} />
              <Form.ErrorText text={errors.price.message} />
            </Form.FormControl>
            <Form.FormControl>
              <label htmlFor="description">Description</label>
              <Form.TextArea
                value={inputs.description}
                name="description"
                onChange={handleChange}
              />
            </Form.FormControl>
            <Form.FormControl>
              <label htmlFor="photos">Photos</label>
              <Input type="file" multiple name="photos" onChange={handleFileChange} />
              <Carousel images={imagePaths} withButtons />
            </Form.FormControl>
            <Form.FormControl>
              <ButtonContainer>
                <Button
                  type="submit"
                  backgroundColor={isError ? 'gray' : 'success'}
                  isWhite
                  borderRadius="lg"
                  size="md"
                >
                  Save Changes
                </Button>
                <DeleteButton type="button" size="md" onClick={handleDeleteClick}>
                  Delete
                </DeleteButton>
              </ButtonContainer>
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
      <Toaster position="bottom-center" />
    </Layout>
  );
};

export default EditItem;
