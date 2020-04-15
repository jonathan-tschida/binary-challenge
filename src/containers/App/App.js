import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Collection from '../Collection/Collection';

function App() {
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
        </Route>
      </Switch>
    </main>
  );
}

export default App;
