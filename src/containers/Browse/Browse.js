import React from 'react';
import './Browse.css';
import Series from '../Series/Series'
import { connect } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

function Browse({ series }) {
  let { path, url } = useRouteMatch();
  const seriesButtons = series.map(series => {
    return <NavLink to={`${url}/series/${series}`} key={series} >{series}</NavLink>
  })
  return (
    <section>
      <div className='browse-button-container'>
        {series.length ? seriesButtons : <p>Loading...</p>}
      </div>
      <Switch>
        <Route path={`${path}/series/:series`} component={Series} />
      </Switch>
    </section>
  )
}

const mapStateToProps = (state) => ({
  series: Object.keys(state.cache)
})

export default connect(mapStateToProps)(Browse);

Browse.propTypes = {
  series: PropTypes.arrayOf(PropTypes.string)
};
