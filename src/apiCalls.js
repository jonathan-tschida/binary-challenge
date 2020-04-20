export const fetchSeriesNames = () => {
  return fetch('https://www.amiiboapi.com/api/amiiboseries')
    .then(response => response.json());
};

export const fetchSeriesData = (series) => {
  return fetch('https://www.amiiboapi.com/api/amiibo/?type=figure&amiiboSeries=' + series)
    .then(response => response.json());
};
