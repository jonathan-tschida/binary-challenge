export const cache = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SERIES_NAMES':
      let previousState = {...state};
      let updatedState = action.series.reduce((updatedState, currentSeries) => {
        const { name } = currentSeries;
        updatedState[name] = previousState[name] ?
          { ...previousState[name], figures: [] } :
          { figures: [] };
        return updatedState;
      }, {})
      return {...updatedState}
    case 'GET_SERIES_DATA':
      let figures = action.data.map(reformatAmiiboData);
      let updatedSeries = {...state[action.series], recentlyFetched: true, figures};
      return {...state, [action.series]: updatedSeries}
    default:
      return state
  }
}

const reformatAmiiboData = (amiibo) => {
  let { head, tail, name, amiiboSeries, image, release } = amiibo;
  return {
    id: head + tail,
    name,
    image,
    series: amiiboSeries,
    release: release.na
  }
}
