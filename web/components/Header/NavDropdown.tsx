import styled from '@emotion/styled';
import { motion, Variants } from 'framer-motion';
import { NavItem } from 'interfaces';
import { FiChevronDown } from 'react-icons/fi';
import React, { useState } from 'react';
import NavLink, { StyledNavLink } from './NavLink';

interface Props {
  item: Extract<NavItem, { kind: 'group' }>;
}

const NavDropdownContent = styled(motion.div)`
  height: 0;
  overflow: hidden;
  border-left: 1px solid black;
  padding-left: 1rem;
  display: grid;
  gap: 0.6rem;
`;

const NavDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
const variants: Variants = {
  hidden: {
    height: 0,
    transition: {
      ease: 'easeIn',
    },
  },
  shown: {
    height: 'auto',
    marginTop: '.3em',
    transition: {
      ease: 'easeIn',
    },
  },
};

const ArrowVariants: Variants = {
  up: {
    rotate: 90,
    transition: {
      ease: 'easeIn',
    },
  },
  down: {
    rotate: 0,
  },
};

const NavDropdown = ({ item }: Props) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <NavDropdownHeader onClick={() => setIsShown((prev) => !prev)}>
        <StyledNavLink as="span">{item.label}</StyledNavLink>

        <button type="button" onClick={() => setIsShown((prev) => !prev)}>
          <motion.div variants={ArrowVariants} animate={isShown ? 'up' : 'down'}>
            <FiChevronDown />
          </motion.div>
        </button>
      </NavDropdownHeader>
      <NavDropdownContent variants={variants} animate={isShown ? 'shown' : 'hidden'}>
        {item.children.map((i) => {
          if (i.kind === 'link') {
            return <NavLink key={i.label} href={i.href} label={i.label} />;
          }
          return null;
        })}
      </NavDropdownContent>
    </div>
  );
};

export default NavDropdown;
