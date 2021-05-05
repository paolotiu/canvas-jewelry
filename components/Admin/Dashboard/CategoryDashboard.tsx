import CreateCategoryPopup from '@components/General/Form/CreateCategoryPopup';
import { apiHandler } from '@utils/apiHandler';
import { deleteCategories, getCategories } from '@utils/queries';
import { CategoryData } from 'interfaces';
import { useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
  const { data: categories, refetch } = useQuery('categories', getCategories);

  const deleteHandler = useCallback(
    async (selectedData: CategoryData[]) => {
      const res = await apiHandler(deleteCategories(selectedData.map((cat) => cat._id)));

      if (res.error) {
        toast.error(res.error.message);
        return;
      }
      toast(`Deleted ${selectedData.length} categor${selectedData.length > 1 ? 'ies' : 'y'}`, {
        icon: '🗑️',
      });

      refetch();
    },
    [refetch],
  );
  return (
    <>
      <Dashboard
        columns={Columns}
        data={categories}
        title="Categories"
        deleteButton={{ onDelete: deleteHandler }}
        additionalButton={<CreateCategoryPopup direction="left" onSubmit={refetch} />}
      />
      <Toaster />
    </>
  );
};

export default CategoryDashboard;
