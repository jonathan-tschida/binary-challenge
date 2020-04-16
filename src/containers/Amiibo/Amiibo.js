import React from 'react';
import './Amiibo.css';

function Amiibo(props) {
  const { id, name, image, series, release } = props;
  const reformatDate = (date) => {
    let [ year, month, day ] = date.split('-');
    return [ month, day, year ].join('/');
  }
  return (
    <article>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{series} series</p>
      {release && <p>Available {reformatDate(release)}</p>}
    </article>
  )
}

export default Amiibo;
