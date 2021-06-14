import CardSection from '@components/Card/CardSection';
import Layout from '@components/Layout';
import styled from '@emotion/styled';
import { CategoryWithProductsReturn } from '@utils/sanity/queries';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
`;

interface Props {
  category: CategoryWithProductsReturn;
}
const Category = ({ category }: Props) => {
  return (
    <Layout>
      <Container>
        <CardSection items={category.products} title={category.name || ''} defaultView="block" />
      </Container>
    </Layout>
  );
};

export default Category;
