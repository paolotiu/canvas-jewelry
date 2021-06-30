import styled from '@emotion/styled';
import { FiX } from 'react-icons/fi';
import { breakpoints } from '@styles/breakpoints';
import { motion, Variants } from 'framer-motion';
import { NAV_ITEMS } from 'constants/NAV_ITEMS';
import dynamic from 'next/dynamic';
import { useModal } from '@components/Modal/useModal';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';

const PricePasswordModal = dynamic(() => import('@components/Header/PricePasswordModal'));

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
  justify-content: space-between;
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
    cursor: pointer;

    ${breakpoints.lg} {
      display: none;
    }
  }

  .bottom-nav {
    padding-bottom: 4rem;
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

  body {
    overflow: hidden;
  }
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
  const { isModalOpen, closeModal, openModal } = useModal();

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
        <div>
          {/* <Link href="/" passHref>
            <a className="image-container" href="home">
              <Image
                src="/logo.png"
                layout="responsive"
                width="120"
                height="90"
                alt="logo"
                objectFit="cover"
              />
            </a>
          </Link> */}
          <div className="link-container">
            <NavLink href="/" label="Home" />
            {NAV_ITEMS.map((item) => {
              if (item.kind === 'link') {
                return (
                  <NavLink href={`/category/${item.href}`} label={item.label} key={item.label} />
                );
              }

              return <NavDropdown key={item.label} item={item} />;
            })}
          </div>
        </div>
        <div className="bottom-nav">
          <NavLink asButton label="Show Prices" href="#" onClick={openModal} />
        </div>
      </StyledSidebar>
      <Overlay
        onClick={closeSidebar}
        initial="hidden"
        variants={overlayVariants}
        animate={open ? 'shown' : 'hidden'}
      />
      <PricePasswordModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};

export default Sidebar;
