import Layout from '@components/Admin/Layout/Layout';
import Button from '@components/General/Button';
import Table, { TableProps } from '@components/Table/Table';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
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
    .buttons {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;
      button {
        height: 100%;
      }
    }
  }
`;

interface Props<DataType> extends Omit<TableProps<DataType>, 'data' | 'setSelectedRows'> {
  title: string;
  addButton?: {
    label: string;
    href: string;
  };
  deleteButton?: {
    onDelete?: (data: DataType[]) => void;
  };
  data?: DataType[];
  additionalButton?: React.ReactNode;
}

const Dashboard = <DataType extends Record<string, any>>({
  data,
  title,
  columns,
  addButton,
  deleteButton,
  additionalButton,
  ...rest
}: Props<DataType>) => {
  const [selectedRows, setSelectedRows] = useState<Row<DataType>[]>([]);

  return (
    <Layout>
      <Wrapper>
        <div className="header">
          <h1>{title}</h1>
          <div className="buttons">
            {deleteButton && (
              <Button
                type="button"
                size="sm"
                borderRadius="md"
                withBorder="danger"
                color="danger"
                disabled={selectedRows.length === 0}
                onClick={() =>
                  deleteButton.onDelete &&
                  deleteButton.onDelete(selectedRows.map((row) => row.original))
                }
              >
                Delete {`(${selectedRows.length})`}
              </Button>
            )}
            {addButton && (
              <Link href={addButton.href}>
                <Button size="sm" borderRadius="md" type="button" withBorder>
                  {addButton.label}
                </Button>
              </Link>
            )}
            {additionalButton}
          </div>
        </div>
        {data && (
          <Table data={data} columns={columns} setSelectedRows={setSelectedRows} {...rest} />
        )}
      </Wrapper>

      <Toaster />
    </Layout>
  );
};

export default Dashboard;
