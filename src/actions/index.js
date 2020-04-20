export const getSeriesNames = (series) => ({
  type: 'GET_SERIES_NAMES',
  series
});

export const getSeriesData = (series, data) => ({
  type: 'GET_SERIES_DATA',
  series,
  data
});

export const markBadFetch = (series) => ({
  type: 'MARK_BAD_FETCH',
  series
});

export const toggleCollected = (id) => ({
  type: 'TOGGLE_COLLECTED',
  id
});
