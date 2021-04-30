import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import Link from 'next/link';
import React from 'react';

export const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  width: 0;
  overflow: hidden;
  height: 100vh;

  border-right: 1px solid ${({ theme }) => theme.colors.gray};

  .bottom {
  }
  ${breakpoints.md} {
    width: var(--sidebar-width);

    padding: 3rem 2rem;
  }
`;

const Sidebar = () => (
  <StyledSidebar>
    <div className="top">
      <Link href="/admin/dashboard/items">Items</Link>
    </div>
    <div className="bottom" />
  </StyledSidebar>
);

export default Sidebar;
