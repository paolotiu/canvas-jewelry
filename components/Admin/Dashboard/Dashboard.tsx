import Layout from '@components/Admin/Layout/Layout';
import Button from '@components/General/Button';
import Table, { TableProps } from '@components/Table/Table';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { Row } from 'react-table';

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
interface Props<DataType> extends Omit<TableProps<DataType>, 'data' | 'setSelectedRows'> {
  title: string;
  addButton?: {
    label: string;
    href: string;
  };
  data?: DataType[];
}

const Dashboard = <DataType extends Record<string, any>>({
  data,
  title,
  columns,
  addButton,
  ...rest
}: Props<DataType>) => {
  const [selectedRows, setSelectedRows] = useState<Row<DataType>[]>([]);

  return (
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
        {data && (
          <Table data={data} columns={columns} setSelectedRows={setSelectedRows} {...rest} />
        )}
      </Wrapper>
    </Layout>
  );
};

export default Dashboard;
