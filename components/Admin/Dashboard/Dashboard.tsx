import Layout from '@components/Admin/Layout/Layout';
import Button from '@components/General/Button';
import Table from '@components/Table/Table';
import styled from '@emotion/styled';
import { ItemInterface } from '@models/Item';
import Link from 'next/link';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  .header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-self: center;
  }
`;
interface Props {
  title: string;
  items?: ItemInterface[];
}

const Dashboard = ({ items, title }: Props) => (
  <Layout>
    <Wrapper>
      <div className="header">
        <h1>{title}</h1>
        <Link href="/admin/add">
          <Button size="sm" borderRadius="md" withBorder>
            + Add Item
          </Button>
        </Link>
      </div>
      {items && <Table items={items} />}
    </Wrapper>
  </Layout>
);

export default Dashboard;
