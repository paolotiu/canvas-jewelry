/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>> extends UseSortByOptions<D> {}

  export interface TableInstance<D extends Record<string, unknown>>
    extends UseSortByInstanceProps<D> {}

  export interface TableState<D extends Record<string, unknown>> extends UseSortByState<D> {}

  export interface Column<D extends Record<string, unknown>> extends UseSortByColumnOptions<D> {}

  export interface ColumnInstance<D extends Record<string, unknown>>
    extends UseSortByColumnProps<D> {}
}
