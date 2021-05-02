import styled from '@emotion/styled';
import { breakpoints } from '@styles/breakpoints';
import { motion, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

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
    ${breakpoints.lg} {
      display: none;
    }
    border: none;
    background-color: unset;
  }

  .image-container {
    width: 100%;
    height: 100px;
  }

  .link-container {
    padding-top: 3rem;
  }

  #close-sidebar {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`;

const Overlay = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.blackAlpha[300]};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  ${breakpoints.lg} {
    display: none;
  }
`;

const NavLink = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondaryText};
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
interface Props {
  open: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ open, closeSidebar }: Props) => {
  const initalRef = useRef('hidden');
  useEffect(() => {
    initalRef.current = 'shown';
  }, []);
  return (
    <>
      <StyledSidebar variants={variants} animate={open ? 'shown' : 'hidden'} initial="hidden">
        <button type="button" id="close-sidebar" onClick={closeSidebar}>
          X
        </button>
        <div className="image-container">
          <img
            src="/logo.png"
            width="100%"
            height="100%"
            alt="logo"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="link-container">
          <NavLink>Home</NavLink>
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
