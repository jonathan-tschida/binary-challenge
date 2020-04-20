import { cache } from './cache';

describe('Cache Reducer', () => {
  it('should return the initial state', () => {
    const expectedResult = {};
    const result = cache(undefined, {})
    expect(result).toEqual(expectedResult)
  });

  it('when receiving GET_SERIES_NAMES, should add series properties to the cache', () => {
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
    const action = {
      type: 'GET_SERIES_NAMES',
      series
    };
    const expectedResult = {
      'Super Smash Bros.': {
        figures: []
      },
      'Legend of Zelda': {
        figures: []
      }
    };
    const result = cache({}, action);
    expect(result).toEqual(expectedResult);
  });

  it('when receiving GET_SERIES_DATA, should update the figures array of a series', () => {
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
    const action = {
      type: 'GET_SERIES_DATA',
      series,
      data
    };
    const previousState = {
      'Super Smash Bros.': {
        figures: []
      },
      'Legend of Zelda': {
        figures: []
      }
    };
    const expectedResult = {
      'Super Smash Bros.': {
        figures: [
          {
            id: '0000000000000000',
            name: 'Mario',
            image: 'url.com/image.png',
            series: 'Super Smash Bros.',
            release: '2019-06-12'
          }
        ],
        recentlyFetched: true
      },
      'Legend of Zelda': {
        figures: []
      }
    };
    const result = cache(previousState, action);
    expect(result).toEqual(expectedResult);
  });

})
