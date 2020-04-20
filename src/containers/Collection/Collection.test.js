import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collection from './Collection';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

function renderCollection(testState) {
  const testStore = createStore(rootReducer, testState);
  return render (
    <Provider store={testStore}>
      <Router>
        <Collection />
      </Router>
    </Provider>
  );
};

describe('Collection', () => {
  it('renders a placeholder message when collection is empty', () => {
    const { getByText } = renderCollection();

    expect(getByText('Welcome!')).toBeInTheDocument();
    expect(getByText('Looks like you don\'t have anything in your collection!')).toBeInTheDocument();
    expect(getByText('Click browse to get started!')).toBeInTheDocument();
    expect(getByText('Browse')).toBeInTheDocument();
  });

  it('renders correctly when there are collected amiibos', () => {
    const testState = {
      cache: {
        'Super Smash Bros.': {
          figures: [
            {
              id: '0000000000000000',
              name: 'Mario',
              image: 'url.com/image.png',
              series: 'Super Smash Bros.',
              release: '2019-06-12'
            }
          ]
        }
      },
      collection: ['0000000000000000']
    };
    const { getByText } = renderCollection(testState);

    expect(getByText('Collection')).toBeInTheDocument();
    expect(getByText('Mario')).toBeInTheDocument();
  });
});
