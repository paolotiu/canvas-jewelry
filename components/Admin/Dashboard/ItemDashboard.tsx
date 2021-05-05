import Tag from '@components/Tag/Tag';
import styled from '@emotion/styled';
import { apiHandler } from '@utils/apiHandler';
import { getItems, softDeleteItems } from '@utils/queries';
import { ItemData } from 'interfaces';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import Dashboard from './Dashboard';
import { numSort } from './sortFunctions';

const TagWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const columns: Column<ItemData>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    sortType: (rowA, rowB, columnId) => {
      const id = columnId as 'name';
      const a = rowA.original[id];
      const b = rowB.original[id];
      return -a.toLowerCase().localeCompare(b.toLowerCase());
    },
  },
  {
    Header: 'Price',
    accessor: 'price',
    sortType: numSort,
  },
  { Header: 'Desc', accessor: 'description', disableSortBy: true },
  {
    Header: 'Category',
    accessor: (data) => {
      return data.categories.map((cat) => cat.name);
    },
    id: 'categories',
    Cell: (props: any) => {
      const { value } = props;
      return (
        <TagWrapper>
          {value.map((val: any) => (
            <Tag key={val} label={val} />
          ))}
        </TagWrapper>
      );
    },
  },
];

const ItemDashboard = () => {
  const { data: items, refetch } = useQuery<ItemData[]>('items', getItems);
  return (
    <Dashboard
      baseLink="/admin/item/"
      columns={columns}
      data={items}
      title="Items"
      addButton={{ href: '/admin/add', label: '+ Add Item' }}
      deleteButton={{
        onDelete: async (data) => {
          const res = await apiHandler(softDeleteItems(data.map((item) => item._id)));
          if (res.error) {
            toast.error(res.error.message);
            return;
          }

          toast(`${data.length} item${data.length > 1 ? 's' : ''} deleted`, { icon: '🗑️' });
          refetch();
        },
      }}
    />
  );
};

export default ItemDashboard;
