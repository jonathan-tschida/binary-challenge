import React from 'react';
import './Browse.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Browse({ series }) {
  const seriesButtons = series.map(series => {
    return <Link to={`/browse/series/${series}`} key={series} >{series}</Link>
  })
  return (
    <section>
      <div className='browse-button-container'>
        {series.length ? seriesButtons : <p>Loading...</p>}
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  series: Object.keys(state.cache)
})

export default connect(mapStateToProps)(Browse);
