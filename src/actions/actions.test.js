import * as actions from '.';

describe('Action Creators', () => {
  it('should have a type of GET_SERIES_NAMES and a correct payload', () => {
    const series = [
      {
        name: 'Super Smash Bros.',
        key: '0x00'
      },
      {
        name: 'Legend of Zelda',
        key: '0x01'
      }
    ];
    const expectedResult = {
      type: 'GET_SERIES_NAMES',
      series
    };
    const result = actions.getSeriesNames(series);
    expect(result).toEqual(expectedResult);
  });

  it('should have a type of GET_SERIES_DATA and a correct payload', () => {
    const series = 'Super Smash Bros.';
    const data = [
      {
        name: 'Mario',
        head: '00000000',
        tail: '00000000',
        image: 'url.com/image.png',
        amiiboSeries: 'Super Smash Bros.',
        release: {
          na: '2019-06-12'
        }
      }
    ];
    const expectedResult = {
      type: 'GET_SERIES_DATA',
      series,
      data
    };
    const result = actions.getSeriesData(series, data);
    expect(result).toEqual(expectedResult);
  });

  it('should have a type of MARK_BAD_FETCH and a correct payload', () => {
    const series = 'Super Smash Bros.';
    const expectedResult = {
      type: 'MARK_BAD_FETCH',
      series
    };
    const result = actions.markBadFetch(series);
    expect(result).toEqual(expectedResult);
  });

  it('should have a type of TOGGLE_COLLECTED and a correct payload', () => {
    const id = '0000000000000000';
    const expectedResult = {
      type: 'TOGGLE_COLLECTED',
      id
    };
    const result = actions.toggleCollected(id);
    expect(result).toEqual(expectedResult);
  });
});
