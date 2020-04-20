import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <img src='/amiibo-depot-logo.png' alt='amiibo depot logo' />
      <nav>
        <NavLink to='/browse'>Browse</NavLink>
        <NavLink to='/collection'>Collection</NavLink>
      </nav>
    </header>
  );
};

export default Header;
