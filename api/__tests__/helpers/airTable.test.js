const { faker } = require('@faker-js/faker');
const airTable = require('../../helpers/airTable');
const airTableTestData = require('../../__test-data__/airTable');

describe('Test the AirTable helpers', () => {
  test('getAllRecords gets records from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeRecordsCount = faker.datatype.number({ min: 10, max: 30 });
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = airTableTestData.fakeAirTableRecordsRaw(fakeRecordsCount, fakeTableName);

    // Mock dependencies
    const airTableClientAllMock = jest.fn(() => fakeRecords);
    const airTableClientSelectMock = jest.fn(() => ({ all: airTableClientAllMock }));
    const airTableClientTableSpy = jest
      .spyOn(airTable.client, 'table')
      .mockImplementation(() => ({ select: airTableClientSelectMock }));

    // Run test
    const allRecords = await airTable.getAllRecords(fakeTableName);

    expect(airTableClientTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableSpy).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientSelectMock).toHaveBeenCalledTimes(1);
    expect(airTableClientAllMock).toHaveBeenCalledTimes(1);
    const randomRecordsIndex = faker.datatype.number(fakeRecordsCount - 1);
    expect(allRecords[randomRecordsIndex]).toEqual(fakeRecords[randomRecordsIndex].fields);

    // Clean up
    airTableClientTableSpy.mockRestore();
  });

  test('getRecord get a record from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = airTableTestData.fakeAirTableRecordsRaw(1, fakeTableName);
    const fakeFieldName = Object.entries(fakeRecords[0].fields)[0][0];
    const fakeFieldValue = faker.lorem.words(5);

    // Mock dependencies
    const airTableClientAllMock = jest.fn(() => fakeRecords);
    const airTableClientSelectMock = jest.fn(() => ({ all: airTableClientAllMock }));
    const airTableClientTableSpy = jest
      .spyOn(airTable.client, 'table')
      .mockImplementation(() => ({ select: airTableClientSelectMock }));

    // Run test
    const record = await airTable.getRecord(fakeTableName, fakeFieldName, fakeFieldValue);

    expect(airTableClientTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableSpy).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientSelectMock).toHaveBeenCalledTimes(1);
    expect(airTableClientSelectMock).toHaveBeenCalledWith({
      filterByFormula: `{${fakeFieldName}} = '${fakeFieldValue}'`,
    });
    expect(airTableClientAllMock).toHaveBeenCalledTimes(1);
    expect(record).toEqual(fakeRecords[0].fields);

    // Clean up
    airTableClientTableSpy.mockRestore();
  });
});
