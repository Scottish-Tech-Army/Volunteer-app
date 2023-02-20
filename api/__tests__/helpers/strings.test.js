const { faker } = require('@faker-js/faker');
const stringsHelper = require('../../helpers/strings');

describe('Test the strings helpers', () => {
  test('removeBlankLines correctly removes blank lines', () => {
    const stringWithBlankLines = `Something
    
    something else
    
    something more`;
    const stringWithoutBlankLines = `Something
    something else
    something more`;

    const stringFormatted = stringsHelper.removeBlankLines(stringWithBlankLines);

    expect(stringFormatted).toEqual(stringWithoutBlankLines);
  });

  test('splitByLineBreak correctly splits a string into an array', () => {
    const stringWithLineBreaks = `Something
    something else
    something more`;
    const arrayOfLinesTrimmed = ['Something', 'something else', 'something more'];

    const stringFormatted = stringsHelper.splitByLineBreak(stringWithLineBreaks);

    expect(stringFormatted).toEqual(arrayOfLinesTrimmed);
  });


  // My test
  test('checkIfString works and test for the content for it type - string ', () => {
    const checkTypeIfString = 'Content is a string';
    const stringCheck = ('Content is a string');

    const stringChecked = stringsHelper.checkIfString(checkTypeIfString);

    expect(stringChecked).toEqual(stringCheck);
    console.log(stringChecked + 'stringChecked');
    console.log(stringCheck + 'stringCheck');
  });
});
