import React, { Component } from 'react';
import './Series.css';
import Amiibo from '../Amiibo/Amiibo';
import { connect } from 'react-redux';
import { getSeriesData } from '../../actions';

class Series extends Component {
  componentDidMount() {
    let { series } = this.props.match.params;
    this.props.recentlyFetched ||
    fetch('https://www.amiiboapi.com/api/amiibo/?type=figure&amiiboSeries=' + series)
      .then(response => response.json())
      .then(data => {
        this.props.getSeriesData(series, data.amiibo)
      })
      .catch(error => console.error(error.message))
  }

  componentDidUpdate() {
    let { series } = this.props.match.params;
    this.props.recentlyFetched ||
    fetch('https://www.amiiboapi.com/api/amiibo/?type=figure&amiiboSeries=' + series)
      .then(response => response.json())
      .then(data => {
        console.log('fetched')
        this.props.getSeriesData(series, data.amiibo)
      })
      .catch(error => console.error(error.message))
  }

  render() {
    let { series } = this.props.match.params;
    let { figures } = this.props;
    let amiiboCards = figures.map(figure => {
      return <Amiibo {...figure} key={figure.id} />
    })
    return (
      <section className='series' >
        <h1>{series}</h1>
        <div className='amiibo-container' >
          {amiiboCards.length ? amiiboCards : <p>Loading...</p>}
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSeriesData: (series, data) => dispatch( getSeriesData(series, data) )
})

const mapStateToProps = (state, ownProps) => {
  let { series } = ownProps.match.params;
  let seriesCache = state.cache[series] || {};
  let figures = seriesCache.figures || [];
  return {
    recentlyFetched: seriesCache.recentlyFetched || false,
    figures
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
