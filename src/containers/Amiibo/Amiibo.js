import React from 'react';
import './Amiibo.css';

function Amiibo(props) {
  const { id, name, image, series, release } = props;
  return (
    <article>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4>{series}</h4>
      <p>{release}</p>
    </article>
  )
}
