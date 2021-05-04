/* eslint-disable arrow-body-style */
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  TableToggleCommonProps,
  TableToggleAllRowsSelectedProps,
} from 'react-table';

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

const Checkbox = React.forwardRef<HTMLInputElement, Partial<TableToggleAllRowsSelectedProps>>(
  ({ indeterminate, ...rest }, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  },
);

export interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  baseLink: string;
  setSelectedRows: (arr: any[]) => void;
}

const Table = <DataType extends Record<string, unknown>>({
  data,
  columns,
  baseLink,
  setSelectedRows,
}: TableProps<DataType>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable<DataType>(
    {
      data,
      columns,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((col) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return <Checkbox {...getToggleAllRowsSelectedProps({})} />;
          },
          Cell: ({ row }: { row: any }) => {
            return <Checkbox {...row.getToggleRowSelectedProps()} />;
          },
        },
        ...col,
      ]);
    },
  );

  useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedFlatRows, setSelectedRows]);
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
