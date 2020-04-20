import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Amiibo from './Amiibo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

function renderAmiibo() {
  const testStore = createStore(rootReducer);
  return render (
    <Provider store={testStore}>
      <Router>
        <Amiibo {...mockAmiibo} />
      </Router>
    </Provider>
  );
};

const mockAmiibo = {
  id: '0000000000000000',
  name: 'Mario',
  image: 'url.com/image.png',
  series: 'Super Smash Bros.',
  release: '2019-06-12'
};

describe('Amiibo', () => {
  it('renders correcly', () => {
    const { getByText, getByAltText } = renderAmiibo();

    expect(getByAltText('Mario')).toBeInTheDocument();
    expect(getByText('Mario')).toBeInTheDocument();
    expect(getByText('Super Smash Bros. series')).toBeInTheDocument();
    expect(getByText('Available 06/12/2019')).toBeInTheDocument();
    expect(getByText('Removed from collection')).toBeInTheDocument();
  });

  it('should be marked collected when clicked', () => {
    const { getByText } = renderAmiibo();

    fireEvent.click(getByText('Mario'));

    expect(getByText('Added to collection')).toBeInTheDocument();
  });

  it('should not be marked collected when clicked again', () => {
    const { getByText } = renderAmiibo();

    fireEvent.click(getByText('Mario'));
    expect(getByText('Added to collection')).toBeInTheDocument();

    fireEvent.click(getByText('Mario'));
    expect(getByText('Removed from collection')).toBeInTheDocument();
  });

});
