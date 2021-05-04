import { getCategories } from '@utils/queries';
import { CategoryData } from 'interfaces';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import Dashboard from './Dashboard';
import { nameSort, numSort } from './sortFunctions';

const Columns: Column<CategoryData>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    sortType: nameSort,
  },
  {
    Header: 'Items',
    accessor: 'itemCount',
    sortType: numSort,
  },
];

const CategoryDashboard = () => {
  const { data: categories } = useQuery('categories', getCategories);
  return (
    <Dashboard columns={Columns} data={categories} title="Categories" baseLink="/admin/category" />
  );
};

export default CategoryDashboard;
