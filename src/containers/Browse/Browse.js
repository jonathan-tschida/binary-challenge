import React from 'react';
import './Browse.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Browse({ series }) {
  const seriesButtons = series.map(series => {
    return <Link to={`series/${series}`}>{series}</Link>
  })
  return (
    <div>
      <h2>Browse</h2>
      {seriesButtons}
    </div>
  )
}

const mapStateToProps = (state) => ({
  series: Object.keys(state.cache)
})

export default connect(mapStateToProps)(Browse);
