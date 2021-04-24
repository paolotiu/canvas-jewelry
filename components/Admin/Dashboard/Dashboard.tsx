import Table from '@components/Table/Table';
import { ItemInterface } from '@models/Item';
import React from 'react';

interface Props {
  items: ItemInterface[];
}
const Dashboard = ({ items }: Props) => <Table items={items} />;

export default Dashboard;
