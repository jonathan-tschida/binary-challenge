import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>amiibo repo</h1>
      <nav>
        <NavLink to='/browse'>Browse</NavLink>
        <NavLink to='/collection'>Collection</NavLink>
      </nav>
    </header>
  )
}

export default Header;
