import styled from '@emotion/styled';
import Layout from '@components/Layout';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { useRouter } from 'next/router';
import Carousel from '@components/Carousel/Carousel';
import { useQuery } from 'react-query';
import { getItemById } from '@utils/queries';

const InfoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  position: relative;
  .back {
    position: absolute;
    left: 5%;
    padding: 0.4rem 0.4rem 0.2rem 0.2rem;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const TextContainer = styled.div`
  padding: 1rem 0.7rem;
  line-height: 1.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  h3 {
    font-weight: ${({ theme }) => theme.typography.fontWeights.light};
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }

  .price {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  }
`;
interface Props {
  id: string;
}
const Product = ({ id }: Props) => {
  const router = useRouter();
  const { data } = useQuery(['item', id], () => getItemById(id), { enabled: false });
  return (
    <Layout title={data?.item.name}>
      <main>
        <InfoBlock>
          <button type="button" className="back" onClick={() => router.back()}>
            <ChevronLeft />
          </button>

          <h4>Product Details</h4>
        </InfoBlock>
        <Carousel withButtons withAutoPlay images={data?.item.imageUrls || []} />
        <TextContainer>
          <h3>{data?.item.name} </h3>
          <p className="description">{data?.item.description}</p>
          <p className="price">P{data?.item.price}</p>
        </TextContainer>
      </main>
    </Layout>
  );
};

export default Product;
