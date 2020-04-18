import React from 'react';
import './Collection.css';
import Amiibo from '../Amiibo/Amiibo';
import { Link } from 'react-router-dom';
import { toggleCollected } from '../../actions';
import { connect } from 'react-redux';

function Collection({ figures }) {
  if (figures.length) {
    let amiiboCards = figures.map(figure => {
      return <Amiibo {...figure} key={figure.id} />
    })
    return (
      <section className='series' >
        <h1>Collection</h1>
        <div className='amiibo-container' >
          {amiiboCards.length ? amiiboCards : <p>Loading...</p>}
        </div>
      </section>
    )
  }
  return (
    <section className='empty-collection-message'>
      <h2>Oops!</h2>
      <p>Looks like you don't have anything in your collection!</p>
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
