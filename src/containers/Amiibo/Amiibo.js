import React from 'react';
import './Amiibo.css';
import { toggleCollected } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Amiibo(props) {
  const { id, name, image, series, release, collected } = props;

  const reformatDate = (date) => {
    let [ year, month, day ] = date.split('-');
    return [ month, day, year ].join('/');
  };

  const styling = collected ?
    'amiibo-card collected' :
    'amiibo-card';

  return (
    <article className={styling} onClick={() => props.toggleCollected(id)}>
      <img src={image} alt={name} />
      {collected && <PopUp content={'Added to collection'} />}
      {collected || <PopUp content={'Removed from collection'} />}
      <h3>{name}</h3>
      <p>{series} series</p>
      {release && <p>Available {reformatDate(release)}</p>}
    </article>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collected: state.collection.includes(ownProps.id)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollected: (id) => dispatch( toggleCollected(id) )
});

export default connect(mapStateToProps, mapDispatchToProps)(Amiibo);

function PopUp({ content }) {
  return (
    <p className='popup'>{content}</p>
  );
};

Amiibo.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  series: PropTypes.string,
  release: PropTypes.string,
  collected: PropTypes.bool,
  toggleCollected: PropTypes.func.isRequired
};
