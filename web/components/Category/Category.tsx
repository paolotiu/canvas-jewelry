import CardSection from '@components/Card/CardSection';
import Layout from '@components/Layout';
import styled from '@emotion/styled';
import { previewAtom } from '@utils/jotai';
import { CategoryWithProductsReturn, CATEGORY_BY_SLUG_QUERY } from '@utils/sanity/queries';
import { urlFor, usePreviewSubscription } from '@utils/sanity/sanity';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';

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
    <Layout>
      <NextSeo
        title={`Canvas | ${data.name}`}
        openGraph={{
          images: [
            {
              url:
                urlFor(category.image || '')
                  .width(1200)
                  .height(630)
                  .url() ||
                category.image?.url ||
                '',
              height: 630,
              width: 1200,
            },
          ],
        }}
      />
      <Container>
        <CardSection items={data.products} title={data.name || ''} defaultView="block" />
      </Container>
    </Layout>
  );
};

export default Category;
