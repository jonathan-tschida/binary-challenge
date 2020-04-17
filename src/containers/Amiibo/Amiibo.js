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
  const styling = props.collected ?
    'amiibo-card collected' :
    'amiibo-card';
  return (
    <article className={styling} onClick={() => props.toggleCollected(id)}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{series} series</p>
      {release && <p>Available {reformatDate(release)}</p>}
    </article>
  )
}

const mapStateToProps = (state, ownProps) => ({
  collected: state.collection.includes(ownProps.id)
})

const mapDispatchToProps = (dispatch) => ({
  toggleCollected: (id) => dispatch( toggleCollected(id) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Amiibo);
