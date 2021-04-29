import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const WithSidebar = styled.div`
  --sidebar-width: clamp(200px, 15vw, 300px);

  .content {
    ${breakpoints.md} {
      margin-left: var(--sidebar-width);
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <WithSidebar>
    <Sidebar />
    <main className="content">{children}</main>
  </WithSidebar>
);

export default Layout;
