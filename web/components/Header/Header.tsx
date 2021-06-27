import React, { useEffect, useState } from 'react';
import Burger from '@assets/icons/burger.svg';
// import Search from '@assets/icons/search.svg';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import Image from 'next/image';
import { breakpoints, points } from '@styles/breakpoints';
import Link from 'next/link';

const Sidebar = dynamic(
  () => (window.innerWidth > points.lg ? import('./Sidebar') : import('./MobileSidebar')),
  { ssr: false },
);

const StyledHeader = styled.header`
  padding: 0.7rem;
  padding-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  position: sticky;
  top: 0;
  z-index: 5;
  ${breakpoints.lg} {
    display: none;
  }
  div {
    justify-self: center;
  }

  #burger {
    shape-rendering: crispEdges;
  }
`;

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
`;

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > points.lg) {
        setIsSidebarOpen(true);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <>
      <Sidebar open={isSidebarOpen} closeSidebar={closeSidebar} />
      <StyledHeader>
        <Burger id="burger" onClick={openSidebar} />

        <Link href="/" passHref>
          <LogoLink href="home">
            <Image
              src="/logo.png"
              alt="logo"
              width="113"
              quality="100"
              height="30"
              layout="fixed"
              className="logo"
              objectFit="cover"
            />
          </LogoLink>
        </Link>
        {/* <Search style={{ justifySelf: 'end' }} /> */}
      </StyledHeader>
    </>
  );
};

export default Header;
