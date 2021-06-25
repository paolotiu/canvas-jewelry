import CardSection from '@components/Card/CardSection';
import Layout from '@components/Layout';
import styled from '@emotion/styled';
import { CategoryWithProductsReturn } from '@utils/sanity/queries';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
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
