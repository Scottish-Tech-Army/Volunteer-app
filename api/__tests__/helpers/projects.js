const { faker } = require('@faker-js/faker');
const projectsHelpers = require('../../helpers/projects');
const stringsHelpers = require('../../helpers/strings');
const projectsTestData = require('../../__test-data__/projects');

describe('Test the projects helpers', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('formatProjectResourceFromAirTable correctly formats data it receives from AirTable', async () => {
    // Set up fake test data
    const fakeProjectResourceDataFromAirTable = projectsTestData.fakeAirTableProjectResource(1, false);

    // Mock dependencies
    const stringsHelpersSplitByLineBreakSpy = jest
      .spyOn(stringsHelpers, 'splitByLineBreak')
      .mockImplementation(() => {});
    const stringsHelpersRemoveBlankLinesSpy = jest
      .spyOn(stringsHelpers, 'removeBlankLines')
      .mockImplementation(() => {});

    // Run test
    const formattedProjectResource = projectsHelpers.formatProjectResourceFromAirTable(
      fakeProjectResourceDataFromAirTable,
    );

    expect(stringsHelpersSplitByLineBreakSpy).toHaveBeenCalledTimes(1);
    expect(stringsHelpersRemoveBlankLinesSpy).toHaveBeenCalledTimes(1);
    expect(stringsHelpersRemoveBlankLinesSpy).toHaveBeenCalledWith(fakeProjectResourceDataFromAirTable.skills);
    expect(formattedProjectResource.buddying).toEqual(false);
    expect(formattedProjectResource.required).toEqual('1 person');

    // Clean up
    stringsHelpersSplitByLineBreakSpy.mockRestore();
    stringsHelpersRemoveBlankLinesSpy.mockRestore();
  });
});
