import { Row } from 'react-table';

export const nameSort = <DataType extends Record<string, any>>(
  rowA: Row<DataType>,
  rowB: Row<DataType>,
  columnId: string,
) => {
  const a = rowA.original[columnId];
  const b = rowB.original[columnId];
  return a.toLowerCase().localeCompare(b.toLowerCase());
};

export const numSort = <DataType extends Record<string, any>>(
  rowA: Row<DataType>,
  rowB: Row<DataType>,
  columnId: string,
) => {
  if (rowA.original[columnId] > rowB.original[columnId]) return 1;
  if (rowA.original[columnId] < rowB.original[columnId]) return -1;
  return 0;
};
