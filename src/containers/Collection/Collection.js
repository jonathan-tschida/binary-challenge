import React from 'react';
import './Collection.css';
import { Link } from 'react-router-dom';
import { toggleCollected } from '../../actions';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  let cachedFigures = Object.keys(state.cache).flatMap(series => {
    return state.cache[series].figures
  });
  let collectedFigures = state.collection.map(id => {
    return cachedFigures.find(figure => figure.id === id)
  })
  return { figures: collectedFigures }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCollected: (id) => dispatch( toggleCollected(id) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
