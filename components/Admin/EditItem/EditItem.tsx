import dynamic from 'next/dynamic';
import Button from '@components/General/Button';
import Form from '@components/General/Form/Form';
import Layout from '@components/Admin/Layout/Layout';
import styled from '@emotion/styled';
import { ItemDocument } from '@models/Item';
import { breakpoints } from '@styles/breakpoints';
import { getCategories, softDeleteItem, updateItem } from '@utils/queries';
import { useForm } from '@utils/hooks/useForm';
import { useImages } from '@utils/hooks/useImages';
import { useRouter } from 'next/router';
import { apiHandler } from '@utils/apiHandler';
import { ItemSchema } from '@utils/validationSchemas';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ImageInputContainer from '@components/General/Form/ImageInputContainer';
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';
import Select, { OptionsType } from 'react-select';
import React, { useState } from 'react';

const Toaster = dynamic<any>(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
});

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  h1 {
    padding: 1rem;
    color: ${({ theme }) => theme.colors.mainText};
  }
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
`;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1080px;
  grid-template-columns: 1fr;

  .constants {
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
  item: ItemDocument;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<
      {
        item: ItemDocument;
      },
      unknown
    >
  >;
}

const EditItem = ({ item, refetch }: Props) => {
  const router = useRouter();

  const { data: categoriesReturn } = useQuery('categories', () => getCategories());
  const {
    handleFileChange,
    getFormData,
    deleteImage,
    getImagePaths,
    reinitializeImages,
    setImage,
  } = useImages(item.images, {
    additive: true,
    onError: (err) => {
      toast.error(err);
    },
    max: 10,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { inputs, handleChange, isError, errors, setErrors } = useForm(
    {
      name: item.name,
      description: item.description,
      price: item.price,
    },
    ItemSchema,
  );

  const [itemCategories, setItemCategories] = useState<
    OptionsType<{ label: string; value: string }>
  >(item.categories.map((cat) => ({ label: cat.name, value: cat._id })));

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await softDeleteItem(item._id);
    router.push('/admin/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isError) {
      return;
    }

    const data = getFormData(inputs);

    // Append categories
    itemCategories.forEach((cat) => {
      data.append('categories', cat.value);
    });

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
    await refetch();
    reinitializeImages();
  };

  return (
    <Layout>
      <Content>
        <h1>
          <Link href="/admin/dashboard">Item</Link> / <span>{item.name}</span>
        </h1>
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
              <Select
                instanceId="react-select"
                options={categoriesReturn?.categories.map((cat) => ({
                  label: cat.name,
                  value: cat._id,
                }))}
                value={itemCategories}
                onChange={(val) => {
                  setItemCategories(val);
                }}
                isMulti
              />
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
              <ImageInputContainer
                setImage={setImage}
                imagePaths={getImagePaths()}
                onChange={handleFileChange}
                onDelete={deleteImage}
              />
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
      </Content>
      <Toaster />
    </Layout>
  );
};

export default EditItem;
