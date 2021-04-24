/* eslint-disable arrow-body-style */
import styled from '@emotion/styled';
import { ItemInterface } from '@models/Item';
import Link from 'next/link';
import React from 'react';
import { Column, useTable } from 'react-table';

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

const columns: Column<ItemInterface>[] = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Desc', accessor: 'description' },
];

interface Props {
  items: ItemInterface[];
}

const Table = ({ items }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    data: items,
    columns,
  });

  return (
    <TableWrapper>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>
                  <h4>{col.render('Header')}</h4>
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
              <Link href={`/admin/item/${row.original._id}`} key={props.key}>
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
