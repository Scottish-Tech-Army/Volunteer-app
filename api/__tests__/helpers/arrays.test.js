const { faker } = require('@faker-js/faker');
const arraysHelper = require('../../helpers/arrays');

describe('Test the arrays helpers', () => {
  test('chunk breaks array into chunks of sub-arrays', () => {
    const originalArrayLength = faker.datatype.number({ min: 50, max: 100 });
    const originalArray = faker.datatype.array(originalArrayLength);
    const chunkLength = faker.datatype.number({ min: 2, max: 10 });

    const chunkedArray = arraysHelper.chunk(originalArray, chunkLength);

    expect(chunkedArray.length).toBe(Math.ceil(originalArrayLength / chunkLength));
    expect(chunkedArray.pop().length).toBe(
      originalArrayLength % chunkLength > 0 ? originalArrayLength % chunkLength : chunkLength,
    );
  });
});
