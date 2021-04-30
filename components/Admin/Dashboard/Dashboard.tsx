import Layout from '@components/Admin/Layout/Layout';
import Button from '@components/General/Button';
import Table, { TableProps } from '@components/Table/Table';
import styled from '@emotion/styled';
import { ItemData } from 'interfaces';
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
interface Props<DataType> extends Omit<TableProps<DataType>, 'data'> {
  title: string;
  addButton?: {
    label: string;
    href: string;
  };
  data?: DataType[];
}

const Dashboard = <DataType extends ItemData>({
  data,
  title,
  columns,
  addButton,
  ...rest
}: Props<DataType>) => (
  <Layout>
    <Wrapper>
      <div className="header">
        <h1>{title}</h1>
        {addButton ? (
          <Link href={addButton.href}>
            <Button size="sm" borderRadius="md" withBorder>
              {addButton.label}
            </Button>
          </Link>
        ) : null}
      </div>
      {data && <Table data={data} columns={columns} {...rest} />}
    </Wrapper>
  </Layout>
);

export default Dashboard;
