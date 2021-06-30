import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledNavLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

interface CommonProps {
  label: string;
  href: string;
}

interface AsLinkProps extends CommonProps {
  asButton?: false;
}
interface AsButtonProps extends CommonProps {
  asButton: true;
  onClick: () => void;
}

function NavLink(props: AsLinkProps): JSX.Element;
function NavLink(props: AsButtonProps): JSX.Element;

function NavLink({
  href,
  label,
  asButton,
  onClick,
}: CommonProps & { asButton?: boolean; onClick?: () => void }) {
  if (asButton) {
    return (
      <StyledNavLink as="button" type="button" onClick={onClick}>
        {label}
      </StyledNavLink>
    );
  }
  return (
    <Link href={href} passHref>
      <StyledNavLink>{label}</StyledNavLink>
    </Link>
  );
}
export default NavLink;
