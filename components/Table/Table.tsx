/* eslint-disable arrow-body-style */
import styled from '@emotion/styled';
import { ItemData } from 'interfaces';
import Link from 'next/link';
import { Column, useTable, useSortBy } from 'react-table';

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  overflow: scroll;
  width: 100%;
  text-align: left;

  th,
  td {
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  th {
    border-width: 2px;
    .header-label {
      display: flex;
      span {
        width: 0;
        padding-left: 10px;
      }
    }
  }

  tbody tr {
    cursor: pointer;
    :hover {
      background-color: ${({ theme }) => theme.colors.blackAlpha[50]};
    }
  }

  tr:last-child td {
    border-bottom-width: 0;
  }
`;

export interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  baseLink: string;
}

const Table = <DataType extends ItemData>({ data, columns, baseLink }: TableProps<DataType>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<DataType>(
    {
      data,
      columns,
    },
    useSortBy,
  );

  return (
    <TableWrapper>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                  <div className="header-label">
                    {col.render('Header')}
                    <span> {col.isSorted ? (col.isSortedDesc ? ' 🔽' : ' 🔼') : ''} </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const props = row.getRowProps();
            return (
              <Link href={`${baseLink}${row.original._id}`} key={props.key}>
                <tr {...props}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
