import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Series from './Series';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { fetchSeriesData } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

function renderSeries(testState) {
  const testStore = createStore(rootReducer, testState);
  const mockMatch = {
    params: {
      series: 'Super Smash Bros.'
    }
  };
  return render (
    <Provider store={testStore}>
      <Router>
        <Series match={mockMatch} />
      </Router>
    </Provider>
  );
};

fetchSeriesData.mockResolvedValue({
  amiibo: [
    {
      name: 'Mario',
      head: '00000000',
      tail: '00000000',
      image: 'url.com/image.png',
      amiiboSeries: 'Super Smash Bros.',
      release: {
        na: '2019-06-12'
      }
    }
  ]
});

describe('Series', () => {
  it('renders correctly', async () => {
    const { getByText, getByAltText } = renderSeries();

    await waitFor(() => getByText('Mario'));

    expect(getByText('Super Smash Bros.')).toBeInTheDocument();
    expect(getByAltText('Mario')).toBeInTheDocument();
    expect(getByText('Mario')).toBeInTheDocument();
  });

  it('renders a loading placeholder while fetching', () => {
    const { getByText, getByAltText } = renderSeries();

    expect(getByText('Super Smash Bros.')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
