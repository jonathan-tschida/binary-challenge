import React, { Component } from 'react';
import './Series.css';

class Series extends Component {

  render() {
    let { series } = this.props.match.params;
    return (
      <h1>{series}</h1>
    )
  }
}

export default Series;
