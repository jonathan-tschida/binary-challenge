export const getSeriesNames = (series) => ({
  type: 'GET_SERIES_NAMES',
  series
})

export const getSeriesData = (series, data) => ({
  type: 'GET_SERIES_DATA',
  series,
  data
})


// cache = {
//   'Super Mario': {
//     key: '0x00',
//     figures: [
//       {
//         id: '0000000000000002',
//         name: 'Mario',
//         series: 'Super Mario',
//         releaseDate: '2014-11-21',
//         image: 'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png'
//       }
//     ]
//   },
//   'Zelda': {
//
//   }
// }
