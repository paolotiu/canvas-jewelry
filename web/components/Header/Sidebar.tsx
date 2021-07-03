import styled from '@emotion/styled';
import { FiX } from 'react-icons/fi';
import { breakpoints } from '@styles/breakpoints';
import { motion, Variants } from 'framer-motion';
import { NAV_ITEMS } from 'constants/NAV_ITEMS';
import dynamic from 'next/dynamic';
import { useModal } from '@components/Modal/useModal';
import Overlay, { overlayVariants } from '@components/Common/Overlay/Overlay';
import { usePreventScroll } from '@utils/hooks/usePreventScroll';
import { useWindowWidth } from '@utils/hooks/useWindowWidth';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';

const PricePasswordModal = dynamic(() => import('@components/Header/PricePasswordModal'));

const StyledSidebar = styled(motion.aside)`
  height: 100%;
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
    padding: 3rem 0;
    display: grid;
    gap: 1em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
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

  .actions {
    padding-top: 2rem;
  }

  .bottom-nav {
    padding-bottom: 4rem;
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

export interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  isHidden?: boolean;
  openCart: () => void;
}

const Sidebar = ({ isOpen, closeSidebar, isHidden, openCart }: SidebarProps) => {
  const { isModalOpen, closeModal, openModal } = useModal();
  const windowWidth = useWindowWidth();
  usePreventScroll(isOpen && windowWidth < 1200);

  return (
    <>
      <StyledSidebar
        variants={variants}
        animate={isOpen ? 'shown' : 'hidden'}
        initial={isHidden ? 'hidden' : 'shown'}
      >
        <button type="button" id="close-sidebar" onClick={closeSidebar}>
          <FiX size={22} strokeWidth="1" />
        </button>
        <div>
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
          <div className="actions">
            <NavLink asButton label="Cart" onClick={openCart} href="#" />
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
        animate={isOpen ? 'shown' : 'hidden'}
      />
      <PricePasswordModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};

export default Sidebar;
