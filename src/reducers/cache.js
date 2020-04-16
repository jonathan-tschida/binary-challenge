export const cache = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SERIES_NAMES':
      let previousState = {...state};
      let updatedState = action.series.reduce((updatedState, currentSeries) => {
        const { name, key } = currentSeries;
        updatedState[name] = previousState[name] ?
          { ...previousState[name], key } :
          { key };
        return updatedState;
      }, {})
      return {...updatedState}
    default:
      return state
  }
}
