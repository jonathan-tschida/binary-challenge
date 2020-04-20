import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Browse from './Browse';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { createMemoryHistory } from 'history';

function renderBrowse(testState) {
  const testStore = createStore(rootReducer, testState);
  const history = createMemoryHistory();
  return render (
    <Provider store={testStore}>
      <Router history={history}>
        <Browse />
      </Router>
    </Provider>
  );
};

describe('Browse', () => {
  it('renders correctly', () => {
    const testState = {
      cache: {
        'Super Smash Bros.': {
          figures: []
        },
        'Legend of Zelda': {
          figures: []
        }
      }
    };
    const { getByText } = renderBrowse(testState);

    expect(getByText('Super Smash Bros.')).toBeInTheDocument();
    expect(getByText('Legend of Zelda')).toBeInTheDocument();
  });

  it('renders a Series after clicking on its link', () => {
    const testState = {
      cache: {
        'Super Smash Bros.': {
          figures: []
        },
        'Legend of Zelda': {
          figures: []
        }
      }
    };
    const { getByText, getAllByText } = renderBrowse(testState);

    fireEvent.click(getByText('Super Smash Bros.'));

    expect(getAllByText('Super Smash Bros.')[1]).toBeInTheDocument();
  });
});
