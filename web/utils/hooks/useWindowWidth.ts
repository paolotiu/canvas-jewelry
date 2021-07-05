import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const changeWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', changeWidth);
    changeWidth();
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);
  return windowWidth;
};
