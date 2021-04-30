import Tag from '@components/Tag/Tag';
import styled from '@emotion/styled';
import { ItemData } from 'interfaces';
import { Column } from 'react-table';
import Dashboard from './Dashboard';

const TagWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const columns: Column<ItemData>[] = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Desc', accessor: 'description' },
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

interface Props {
  items?: ItemData[];
  title: string;
}

const ItemDashboard = ({ items, title }: Props) => {
  return (
    <Dashboard
      baseLink="/admin/item/"
      columns={columns}
      data={items}
      title={title}
      addButton={{ href: '/admin/add', label: '+ Add Item' }}
    />
  );
};

export default ItemDashboard;
