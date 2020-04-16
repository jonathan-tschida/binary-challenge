import React, { Component } from 'react';
import './App.css';
import { getSeries } from '../../actions';
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
        this.props.getSeries(data.amiibo);
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
          <Route path='/browse'>
            <Browse />
          </Route>
          <Route path='/series/:series' component={Series} />
        </Switch>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSeries: (series) => dispatch( getSeries(series) )
});

export default connect(null, mapDispatchToProps)(App);
