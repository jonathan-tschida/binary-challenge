import React from 'react';
import './Browse.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Browse({ series }) {
  const seriesButtons = series.map(series => {
    return <Link to={`series/${series}`} key={series} >{series}</Link>
  })

  if (series.length) {
    return (
      <div>
        <h2>Browse</h2>
        {seriesButtons}
      </div>
    )
  }
  return (
    <div>
      <h2>Browse</h2>
      <p>Loading...</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  series: Object.keys(state.cache)
})

export default connect(mapStateToProps)(Browse);
