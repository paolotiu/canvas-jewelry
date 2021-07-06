import React, { useEffect } from 'react';
import Burger from '@assets/icons/burger.svg';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import Image from 'next/image';
import { breakpoints, points } from '@styles/breakpoints';
import { BsBag } from 'react-icons/bs';
import Link from 'next/link';
import { useOpenClose } from '@utils/hooks/useOpenClose';
import { useAtom } from 'jotai';
import { isCartOpenAtom } from '@utils/jotai';

const Sidebar = dynamic(
  () => (window.innerWidth > points.lg ? import('./Sidebar') : import('./MobileSidebar')),
  { ssr: false },
);

const Cart = dynamic(() => import('../Cart/Cart'), { ssr: false });

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

const BagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const Header = () => {
  const [isSidebarOpen, { close: closeSidebar, open: openSidebar }] = useOpenClose();

  const [isCartOpen, setIsCartOpen] = useAtom(isCartOpenAtom);

  const openCart = () => {
    closeSidebar();
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > points.lg) {
        openSidebar();
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [openSidebar]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} openCart={openCart} />
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
        <BagContainer>
          <BsBag size="20px" onClick={openCart} />
        </BagContainer>
      </StyledHeader>
      <Cart isOpen={isCartOpen} closeCart={closeCart} />
    </>
  );
};

export default Header;
