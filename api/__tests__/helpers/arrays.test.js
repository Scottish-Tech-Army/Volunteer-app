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

// describe('test something in Array', () => {
//   test('breaks array into sub-arrays', () => {
//     const originalArrayLength1 = faker.database.number({ min: 1, max: 49 });
//     const originalArray1 = faker.datatype.array(originalArrayLength1);
//     const chunkLength1 = faker.faker.arrayHelper({ min: 100, max: 150 });

//     expect(chunkArray.length).toBe(Math.ceil(originalArray1, chunkLength1));
//   })
// });
