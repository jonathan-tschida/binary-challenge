import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { createMemoryHistory } from 'history'
import { fetchSeriesNames, fetchSeriesData } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

fetchSeriesNames.mockResolvedValue({
  amiibo: [
    {
      name: 'Super Smash Bros.',
      key: '0x00'
    },
    {
      name: 'Legend of Zelda',
      key: '0x01'
    }
  ]
})

function renderApp(startingRoute) {
  const testStore = createStore(rootReducer);
  const history = createMemoryHistory();
  startingRoute && history.push(startingRoute);
  return render (
    <Provider store={testStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
}

describe('App', () => {
  it('renders the collection route on load', () => {
    const { getByText, getByAltText } = renderApp();

    expect(getByAltText('amiibo depot logo')).toBeInTheDocument();
    expect(getByText('Welcome!')).toBeInTheDocument();
  });

  describe('Browse route', () => {
    it('routes to browse when the header link is clicked', async () => {
      const { getByText, getAllByText } = renderApp();

      fireEvent.click(getAllByText('Browse')[0]);

      await waitFor(() => getByText('Super Smash Bros.'));

      expect(getByText('Legend of Zelda')).toBeInTheDocument();
    });

    it('routes to browse when the link in the help message is clicked', async () => {
      const { getByText, getAllByText } = renderApp();

      fireEvent.click(getAllByText('Browse')[1]);

      await waitFor(() => getByText('Super Smash Bros.'));

      expect(getByText('Legend of Zelda')).toBeInTheDocument();
    });

    it('renders a series when clicked', async () => {
      fetchSeriesData.mockResolvedValueOnce({ amiibo: [] });
      const { getByText, getAllByText } = renderApp('/browse');

      await waitFor(() => getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Super Smash Bros.'));

      expect(getAllByText('Super Smash Bros.')[1]).toBeInTheDocument();
      expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('renders amiibos in that series on a successful fetch', async () => {
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
      const { getByText, getByAltText, getAllByText } = renderApp('/browse');

      await waitFor(() => getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Super Smash Bros.'));

      await waitFor(() => getByText('Mario'));
      expect(getAllByText('Super Smash Bros.')[1]).toBeInTheDocument();
      expect(getByAltText('Mario')).toBeInTheDocument();
    });

    it('renders the correct info for different series', async () => {
      fetchSeriesData.mockResolvedValueOnce({
        amiibo: [
          {
            name: 'Link',
            head: '00001000',
            tail: '00000000',
            image: 'url.com/image.png',
            amiiboSeries: 'Legend of Zelda',
            release: {
              na: '2019-03-20'
            }
          }
        ]
      });
      const { getByText, getByAltText, getAllByText } = renderApp('/browse');

      await waitFor(() => getByText('Legend of Zelda'));
      fireEvent.click(getByText('Legend of Zelda'));

      await waitFor(() => getByText('Link'));
      expect(getAllByText('Legend of Zelda')[1]).toBeInTheDocument();
      expect(getByAltText('Link')).toBeInTheDocument();
    });

    it('holds on to the amiibo data when you navigate away from Browse', async () => {
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
      const { getByText, getByAltText, getAllByText } = renderApp('/browse');

      await waitFor(() => getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Super Smash Bros.'));

      await waitFor(() => getByText('Mario'));
      expect(getAllByText('Super Smash Bros.')[1]).toBeInTheDocument();
      expect(getByAltText('Mario')).toBeInTheDocument();

      fireEvent.click(getByText('Collection'));
      expect(getByText('Welcome!')).toBeInTheDocument();
      fireEvent.click(getAllByText('Browse')[0]);
      fireEvent.click(getByText('Super Smash Bros.'));

      expect(getByAltText('Mario')).toBeInTheDocument();
    });
  });

  describe('Collection route', () => {
    it('adds an amiibo to the collection when clicked', async () => {
      fetchSeriesData.mockResolvedValueOnce({
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
      const { getByText, getByAltText } = renderApp('/browse');

      await waitFor(() => getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Super Smash Bros.'));

      await waitFor(() => getByText('Mario'));
      fireEvent.click(getByText('Mario'));
      fireEvent.click(getByText('Collection'));

      expect(getByAltText('Mario')).toBeInTheDocument();
    });

    it('removes an amiibo from the collection when clicked if it is already added', async () => {
      fetchSeriesData.mockResolvedValueOnce({
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
      const { getByText, getByAltText } = renderApp('/browse');

      await waitFor(() => getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Super Smash Bros.'));

      await waitFor(() => getByText('Mario'));
      fireEvent.click(getByText('Mario'));
      fireEvent.click(getByText('Collection'));
      expect(getByAltText('Mario')).toBeInTheDocument();
      fireEvent.click(getByText('Mario'));

      expect(getByText('Welcome!')).toBeInTheDocument();
    });

    it('also removes an amiibo from the collection from the series route', async () => {
      fetchSeriesData.mockResolvedValueOnce({
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
      const { getByText, getByAltText } = renderApp('/browse');

      await waitFor(() => getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Super Smash Bros.'));

      await waitFor(() => getByText('Mario'));
      fireEvent.click(getByText('Mario'));
      fireEvent.click(getByText('Collection'));
      expect(getByAltText('Mario')).toBeInTheDocument();
      fireEvent.click(getByText('Browse'));
      fireEvent.click(getByText('Super Smash Bros.'));
      fireEvent.click(getByText('Mario'));
      fireEvent.click(getByText('Collection'));

      expect(getByText('Welcome!')).toBeInTheDocument();
    });
  });
});
