import CardSection from '@components/Card/CardSection';
import Layout from '@components/Layout';
import styled from '@emotion/styled';
import { previewAtom } from '@utils/jotai';
import { CategoryWithProductsReturn, CATEGORY_BY_SLUG_QUERY } from '@utils/sanity/queries';
import { usePreviewSubscription } from '@utils/sanity/sanity';
import { useAtom } from 'jotai';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
`;

interface Props {
  category: CategoryWithProductsReturn;
}
const Category = ({ category }: Props) => {
  const [isPreview] = useAtom(previewAtom);

  const { data } = usePreviewSubscription(CATEGORY_BY_SLUG_QUERY, {
    enabled: isPreview,
    initialData: category,
    params: {
      slug: category.slug,
    },
  });
  return (
    <Layout title={`Canvas | ${data.name}`}>
      <Container>
        <CardSection items={data.products} title={data.name || ''} defaultView="block" />
      </Container>
    </Layout>
  );
};

export default Category;
