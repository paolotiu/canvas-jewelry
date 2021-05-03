import React from 'react';
import Sidebar, { SidebarProps } from './Sidebar';

const MobileSidebar = ({ ...rest }: SidebarProps) => <Sidebar {...rest} isHidden />;
export default MobileSidebar;
