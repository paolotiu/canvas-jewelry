import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { NavLink } from 'interfaces';
import Link from 'next/link';
import React from 'react';

const StyledNavGrid = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.gray};
  gap: 1px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-top: 0;
  ${breakpoints.sm} {
    display: none;
  }
`;

const StyledNavLink = styled.a`
  display: inline-flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 0.6rem;

  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.light};
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.white};
`;

interface Props {
  links: NavLink[];
}

const NavGrid = ({ links }: Props) => {
  return (
    <StyledNavGrid>
      {links.map(({ label, href }) => {
        return (
          <Link href={href} key={label} passHref>
            <StyledNavLink>{label}</StyledNavLink>
          </Link>
        );
      })}
    </StyledNavGrid>
  );
};

export default NavGrid;
