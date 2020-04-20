import React, { Component } from 'react';
import './App.css';
import { getSeriesNames } from '../../actions';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Collection from '../Collection/Collection';
import Browse from '../Browse/Browse';
import { fetchSeriesNames } from '../../apiCalls';
import PropTypes from 'prop-types';

class App extends Component {
  componentDidMount() {
    fetchSeriesNames()
      .then(data => {
        this.props.getSeriesNames(data.amiibo);
      })
      .catch(error => console.error(error.message));
  };

  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/collection' />
          </Route>
          <Route path='/collection'>
            <Collection />
          </Route>
          <Route path='/browse'>
            <Browse />
          </Route>
          <Route path='*'>
            <h1>404</h1>
          </Route>
        </Switch>
      </main>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSeriesNames: (series) => dispatch( getSeriesNames(series) )
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  getSeriesNames: PropTypes.func.isRequired
};
