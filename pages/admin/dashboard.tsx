import Dashboard from '@components/Admin/Dashboard/Dashboard';
import Protected from '@components/Admin/Protected';
import { ItemInterface } from '@models/Item';
import { getItems } from '@utils/queries';
import { useQuery } from 'react-query';

const DashboardPage = () => {
  const { data } = useQuery<ItemInterface[]>('items', () => getItems());

  return (
    <Protected>
      <Dashboard title="Items" items={data} />
    </Protected>
  );
};

export default DashboardPage;
