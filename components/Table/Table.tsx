import styled from '@emotion/styled';
import { ItemInterface } from '@models/Item';
import React from 'react';
import { Column, useTable } from 'react-table';

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  overflow: scroll;
  width: 100%;
  th,
  td {
    padding: 1rem;
  }
  thead {
    color: white;
    background: ${({ theme }) => theme.colors.black};
  }

  text-align: center;

  tr:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.gray};
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
