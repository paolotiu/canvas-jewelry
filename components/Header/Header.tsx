import React from 'react';
import Burger from '@components/assets/icons/burger.svg';
import Search from '@components/assets/icons/search.svg';

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
    margin-left: 10px;
    justify-self: center;
  }
`;
interface Props {}

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <Burger />
      <Image
        src="/logo.png"
        alt="logo"
        width="113"
        quality="100"
        height="30"
        layout="fixed"
        className="logo"
      />
      <Search style={{ justifySelf: 'end' }} />
    </StyledHeader>
  );
};

export default Header;
