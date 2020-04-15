import React from 'react';
import './Collection.css';
import { Link } from 'react-router-dom';

function Collection() {
  return (
    <section className='empty-collection-message'>
      <h2>Oops!</h2>
      <p>Looks like you haven't added anything to your collection yet!</p>
      <p>Click browse to get started!</p>
      <Link to='/browse'>Browse</Link>
    </section>
  )
}

export default Collection;
