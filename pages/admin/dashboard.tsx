import Dashboard from '@components/Admin/Dashboard/Dashboard';
import { ItemInterface } from '@models/Item';
import { getItems } from '@utils/queries';
import React from 'react';
import { useQuery } from 'react-query';

const DashboardPage = () => {
  const { data } = useQuery<ItemInterface[]>('items', () => getItems());

  return <Dashboard title="Items" items={data} />;
};

export default DashboardPage;
