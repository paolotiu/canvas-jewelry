import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledNavLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const NavLink = ({ href, label }: { label: string; href: string }) => {
  return (
    <Link href={href}>
      <StyledNavLink>{label}</StyledNavLink>
    </Link>
  );
};
export default NavLink;
