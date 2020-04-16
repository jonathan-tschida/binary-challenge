import React, { Component } from 'react';
import './Series.css';
import { connect } from 'react-redux';
import { getSeriesData } from '../../actions';

class Series extends Component {
  componentDidMount() {
    let { series } = this.props.match.params;
    fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=' + series)
      .then(response => response.json())
      .then(data => {
        this.props.getSeriesData(series, data.amiibo)
      })
      .catch(error => console.error(error.message))
  }

  render() {
    let { series } = this.props.match.params;
    return (
      <h1>{series}</h1>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSeriesData: (series, data) => dispatch( getSeriesData(series, data) )
})

export default connect(null, mapDispatchToProps)(Series);
