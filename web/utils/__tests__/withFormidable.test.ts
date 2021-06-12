import { fieldToArray } from '../withFormidable';

test('sjakfdas', () => {
  const sampleData = {
    food: 'burger',
    drinks: ['water', 'juice'],
  };

  // Converts 1 to array
  const food = fieldToArray('food', sampleData);
  expect(food).toEqual(['burger']);
  // Preserves array
  const drinks = fieldToArray('drinks', sampleData);
  expect(drinks).toEqual(sampleData.drinks);
  // Returns null for undefined data
  const nothing = fieldToArray('asdlksa', sampleData);
  expect(nothing).toBe(null);
});
