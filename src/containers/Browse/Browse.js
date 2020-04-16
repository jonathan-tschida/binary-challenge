import React from 'react';
import './Browse.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Browse({ series }) {
  const seriesButtons = series.map(series => {
    return <Link to={`/browse/series/${series}`} key={series} >{series}</Link>
  })

  if (series.length) {
    return (
      <section>
        <h2>Browse</h2>
        <div className='browse-button-container'>
          {seriesButtons}
        </div>
      </section>
    )
  }
  return (
    <section>
      <h2>Browse</h2>
      <p>Loading...</p>
    </section>
  )
}

const mapStateToProps = (state) => ({
  series: Object.keys(state.cache)
})

export default connect(mapStateToProps)(Browse);
