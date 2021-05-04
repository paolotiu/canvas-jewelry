import styled from '@emotion/styled';
import { getCategories, getItems } from '@utils/queries';
import React from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import Layout from '../Layout/Layout';

const Wrapper = styled.div`
  padding: 3rem;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(4, 1fr);
`;

const ModelCard = styled.div(
  {
    padding: '1rem',
    cursor: 'pointer',
  },
  ({ theme }) => ({
    border: `1px solid ${theme.colors.gray}`,
    borderRadius: theme.borderRadius.base,

    h3: {
      fontsize: theme.typography.fontSizes.xl,
      color: theme.colors.headerText,
      borderBottom: `1px solid ${theme.colors.gray}`,
      paddingBottom: `.5rem`,
    },
    '.info': {
      paddingTop: '1rem',
    },
    ':hover': {
      h3: {
        textDecoration: 'underline',
      },
    },
  }),
);

const AllDashboard = () => {
  const { data: items } = useQuery('items', getItems);
  const { data: categories } = useQuery('categories', getCategories);
  return (
    <Layout>
      <Wrapper>
        <Link shallow href="/admin/dashboard/items">
          <ModelCard>
            <h3>Items</h3>
            <div className="info">
              <p>Amount: {items?.length}</p>
            </div>
          </ModelCard>
        </Link>
        <ModelCard>
          <h3>Categories</h3>
          <div className="info">
            <p>Amount: {categories?.length}</p>
          </div>
        </ModelCard>
      </Wrapper>
    </Layout>
  );
};

export default AllDashboard;
