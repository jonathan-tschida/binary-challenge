import React, { Component } from 'react';
import './App.css';
import { getSeriesNames } from '../../actions';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Collection from '../Collection/Collection';
import Browse from '../Browse/Browse';
import Series from '../Series/Series';

class App extends Component {
  componentDidMount() {
    fetch('https://www.amiiboapi.com/api/amiiboseries')
      .then(response => response.json())
      .then(data => {
        this.props.getSeriesNames(data.amiibo);
      })
      .catch(error => console.error(error.message))
  }

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
          <Route exact path='/browse'>
            <Browse />
          </Route>
          <Route path='/browse/series/:series' component={Series} />
        </Switch>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSeriesNames: (series) => dispatch( getSeriesNames(series) )
});

export default connect(null, mapDispatchToProps)(App);
