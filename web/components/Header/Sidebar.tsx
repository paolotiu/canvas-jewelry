import styled from '@emotion/styled';
import { FiX } from 'react-icons/fi';
import Link from 'next/link';
import { breakpoints } from '@styles/breakpoints';
import { motion, Variants } from 'framer-motion';
import { NAV_ITEMS } from 'constants/NAV_ITEMS';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';

const StyledSidebar = styled(motion.aside)`
  height: 100vh;
  width: 250px;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  padding: 2rem 3rem;
  flex-direction: column;
  z-index: 10;
  background-color: white;

  button {
    border: none;
    background-color: unset;
  }

  .image-container {
    width: 100%;
    height: 100px;
  }

  .link-container {
    padding-top: 3rem;
    display: grid;
    gap: 1em;
  }

  #close-sidebar {
    position: absolute;
    top: 1rem;
    left: 1rem;

    ${breakpoints.lg} {
      display: none;
    }
  }
`;

const Overlay = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.blackAlpha[300]};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 6;
  ${breakpoints.lg} {
    display: none;
  }
`;
const variants: Variants = {
  hidden: {
    x: `-100%`,

    transition: {
      ease: 'easeInOut',
    },
  },
  shown: {
    x: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
    transitionEnd: {
      pointerEvents: 'none',
    },
  },
  shown: {
    opacity: 1,
    transitionEnd: {
      pointerEvents: 'auto',
    },
  },
};
export interface SidebarProps {
  open: boolean;
  closeSidebar: () => void;
  isHidden?: boolean;
}

const Sidebar = ({ open, closeSidebar, isHidden }: SidebarProps) => {
  return (
    <>
      <StyledSidebar
        variants={variants}
        animate={open ? 'shown' : 'hidden'}
        initial={isHidden ? 'hidden' : 'shown'}
      >
        <button type="button" id="close-sidebar" onClick={closeSidebar}>
          <FiX size={20} />
        </button>
        <Link href="/" passHref>
          <a className="image-container" href="home">
            <img
              src="/logo.png"
              width="100%"
              height="100%"
              alt="logo"
              style={{ objectFit: 'cover' }}
            />
          </a>
        </Link>
        <div className="link-container">
          {NAV_ITEMS.map((item) => {
            if (item.kind === 'link') {
              return <NavLink href={item.href} label={item.label} key={item.label} />;
            }

            return <NavDropdown key={item.label} item={item} />;
          })}
        </div>
      </StyledSidebar>
      <Overlay
        onClick={closeSidebar}
        initial="hidden"
        variants={overlayVariants}
        animate={open ? 'shown' : 'hidden'}
      />
    </>
  );
};

export default Sidebar;
