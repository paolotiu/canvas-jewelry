import ItemDashboard from '@components/Admin/Dashboard/ItemDashboard';
import { getItems } from '@utils/queries';
import { ItemData } from 'interfaces';
import React from 'react';
import { useQuery } from 'react-query';

const ItemDashboardPage = () => {
  const { data } = useQuery<ItemData[]>('items', () => getItems());

  return <ItemDashboard items={data} title="Items" />;
};

export default ItemDashboardPage;
