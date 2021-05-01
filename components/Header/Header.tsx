import React from 'react';
import Burger from '@assets/icons/burger.svg';
import Search from '@assets/icons/search.svg';

import styled from '@emotion/styled';
import Image from 'next/image';

const StyledHeader = styled.header`
  padding: 0.7rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  div {
    justify-self: center;
  }

  #burger {
    shape-rendering: crispEdges;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Burger id="burger" />
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
      <Search style={{ justifySelf: 'end' }} />
    </StyledHeader>
  );
};

export default Header;
