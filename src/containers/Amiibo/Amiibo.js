import React from 'react';
import './Amiibo.css';
import { toggleCollected } from '../../actions';
import { connect } from 'react-redux';

function Amiibo(props) {
  const { id, name, image, series, release } = props;
  const reformatDate = (date) => {
    let [ year, month, day ] = date.split('-');
    return [ month, day, year ].join('/');
  }
  return (
    <article className='amiibo-card' onClick={() => props.toggleCollected(id)}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{series} series</p>
      {release && <p>Available {reformatDate(release)}</p>}
    </article>
  )
}

const mapDispatchToProps = (dispatch) => ({
  toggleCollected: (id) => dispatch( toggleCollected(id) )
})

export default connect(null, mapDispatchToProps)(Amiibo);
