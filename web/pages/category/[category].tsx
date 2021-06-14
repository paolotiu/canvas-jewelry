import Category from '@components/Category/Category';
import {
  ALL_CATEGORIES_QUERY,
  CategoryWithProductsReturn,
  CATEGORY_BY_NAME_QUERY,
} from '@utils/sanity/queries';
import { getClient } from '@utils/sanity/sanity.server';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getClient(false).fetch<{ name: string }[]>(ALL_CATEGORIES_QUERY);
  const paths = categories.map((cat) => ({
    params: {
      category: cat.name.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ preview = false, params }: GetStaticPropsContext) => {
  if (!params)
    return {
      props: {},
      redirect: '/',
    };

  const { category: name } = params;

  const category = await getClient(preview).fetch<CategoryWithProductsReturn>(
    CATEGORY_BY_NAME_QUERY,
    {
      name,
    },
  );

  if (!category) {
    return {
      props: {},
      redirect: '/',
    };
  }

  return {
    props: {
      category,
    },
  };
};

interface Props {
  category: CategoryWithProductsReturn;
}

const CategoryPage = ({ category }: Props) => {
  return <Category category={category} />;
};

export default CategoryPage;
