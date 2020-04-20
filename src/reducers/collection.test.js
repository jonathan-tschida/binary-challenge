import { collection } from './collection';

describe('Collection Reducer', () => {
  it('when receiving TOGGLE_COLLECTED, should add the id to the collection array if not present', () => {
    const id = '0000000000000000';
    const action = {
      type: 'TOGGLE_COLLECTED',
      id
    };
    const expectedResult = [id, '0000000000000002'];
    const result = collection(['0000000000000002'], action);
    expect(result).toEqual(expectedResult);
  });

  it('when receiving TOGGLE_COLLECTED, should remove the id to the collection array if already present', () => {
    const id = '0000000000000000';
    const action = {
      type: 'TOGGLE_COLLECTED',
      id
    };
    const expectedResult = ['0000000000000002'];
    const result = collection([id, '0000000000000002'], action);
    expect(result).toEqual(expectedResult);
  });
});
