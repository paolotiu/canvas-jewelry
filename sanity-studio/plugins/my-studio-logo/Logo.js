// React is installed in the studio and should be treated as a peer dependency
import React from 'react';
import logo from './logo.png';

// We recommend using SVGs as they have both a small footprint and scale well
const Logo = () => (
  <img
    src={logo}
    width={60}
    height={30}
    style={{ background: 'white', objectFit: 'cover' }}
  />
);

export default Logo;
