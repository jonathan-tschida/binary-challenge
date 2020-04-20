import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header', () => {
  it('renders correctly', () => {
    const { getByAltText, getByText } = render (
      <Router>
        <Header />
      </Router>
    )

    expect(getByAltText('amiibo depot logo')).toBeInTheDocument();
    expect(getByText('Browse')).toBeInTheDocument();
    expect(getByText('Collection')).toBeInTheDocument();
  })
})
