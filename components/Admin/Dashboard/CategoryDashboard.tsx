import { getCategories } from '@utils/queries';
import { CategoryData } from 'interfaces';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import Dashboard from './Dashboard';

const Columns: Column<CategoryData>[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Items',
    accessor: 'itemCount',
  },
];

const CategoryDashboard = () => {
  const { data: categories } = useQuery('categories', getCategories);
  return (
    <Dashboard columns={Columns} data={categories} title="Categories" baseLink="/admin/category" />
  );
};

export default CategoryDashboard;
