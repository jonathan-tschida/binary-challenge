import React, { Component } from 'react';
import './Series.css';
import Amiibo from '../Amiibo/Amiibo';
import { connect } from 'react-redux';
import { getSeriesData, markBadFetch } from '../../actions';
import { fetchSeriesData } from '../../apiCalls';
import PropTypes from 'prop-types';

class Series extends Component {
  componentDidMount() {
    let { series } = this.props.match.params;
    let { errorMessage, recentlyFetched } = this.props;
    (errorMessage || recentlyFetched) ||
    fetchSeriesData(series)
      .then(data => {
        this.props.getSeriesData(series, data.amiibo)
      })
      .catch(error => {
        this.props.markBadFetch(series);
        console.error(error.message);
      });
  };

  componentDidUpdate() {
    let { series } = this.props.match.params;
    let { errorMessage, recentlyFetched } = this.props;
    (errorMessage || recentlyFetched) ||
    fetchSeriesData(series)
      .then(data => {
        this.props.getSeriesData(series, data.amiibo)
      })
      .catch(error => {
        this.props.markBadFetch(series);
        console.error(error.message);
      });
  };

  render() {
    let { series } = this.props.match.params;
    let { figures, errorMessage } = this.props;
    let amiiboCards = figures.map(figure => {
      return <Amiibo {...figure} key={figure.id} />
    });
    let placeholderMessage = errorMessage ? errorMessage : 'Loading...';
    return (
      <section className='series' >
        <h1>{series}</h1>
        <div className='amiibo-container' >
          {amiiboCards.length ? amiiboCards : <p>{placeholderMessage}</p>}
        </div>
      </section>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSeriesData: (series, data) => dispatch( getSeriesData(series, data) ),
  markBadFetch: (series) => dispatch( markBadFetch(series) )
});

const mapStateToProps = (state, ownProps) => {
  let { series } = ownProps.match.params;
  let seriesCache = state.cache[series] || {};
  let figures = seriesCache.figures || [];
  return {
    recentlyFetched: seriesCache.recentlyFetched || false,
    errorMessage: seriesCache.errorMessage,
    figures
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Series);

Series.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      series: PropTypes.string
    })
  }),
  recentlyFetched: PropTypes.bool,
  errorMessage: PropTypes.string,
  figures: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    series: PropTypes.string,
    release: PropTypes.string,
    collected: PropTypes.bool
  })),
  getSeriesData: PropTypes.func.isRequired,
  markBadFetch: PropTypes.func.isRequired
};
