import CardSection from '@components/Card/CardSection';
import Layout from '@components/Layout';
import styled from '@emotion/styled';
import { getCategoryItems } from '@utils/queries';
import { useQuery } from 'react-query';

const Container = styled.div`
  padding: 1rem;
`;
const Category = () => {
  const { data } = useQuery(['category', 'Best Sellers'], () => getCategoryItems('Best sellers'));
  if (!data) return null;
  return (
    <Layout>
      <Container>
        <CardSection items={data} title="Best Sellers" defaultView="block" />
      </Container>
    </Layout>
  );
};

export default Category;
