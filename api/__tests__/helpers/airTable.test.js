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
    const airTableClientTableMock = jest.fn(() => ({ select: airTableClientSelectMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));

    // Run test
    const allRecords = await airTable.getAllRecords(fakeTableName);

    expect(airTableClientSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientSelectMock).toHaveBeenCalledTimes(1);
    expect(airTableClientAllMock).toHaveBeenCalledTimes(1);
    const randomRecordsIndex = faker.datatype.number(fakeRecordsCount - 1);
    expect(allRecords[randomRecordsIndex]).toEqual(fakeRecords[randomRecordsIndex].fields);

    // Clean up
    airTableClientSpy.mockRestore();
  });

  test('getRecord get a record from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = airTableTestData.fakeAirTableRecordsRaw(1, fakeTableName);
    const fakeFieldName1 = Object.entries(fakeRecords[0].fields)[0][0];
    const fakeFieldValue1 = faker.lorem.words(1);
    const fakeFieldName2 = Object.entries(fakeRecords[0].fields)[1][0];
    const fakeFieldValue2 = faker.lorem.words(2);

    // Mock dependencies
    const airTableClientAllMock = jest.fn(() => fakeRecords);
    const airTableClientSelectMock = jest.fn(() => ({ all: airTableClientAllMock }));
    const airTableClientTableMock = jest.fn(() => ({ select: airTableClientSelectMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));

    // Run test
    const record = await airTable.getRecord(fakeTableName, {
      [fakeFieldName1]: fakeFieldValue1,
      [fakeFieldName2]: fakeFieldValue2,
    });

    expect(airTableClientSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientSelectMock).toHaveBeenCalledTimes(1);
    expect(airTableClientSelectMock).toHaveBeenCalledWith({
      filterByFormula: `AND({${fakeFieldName1}} = '${fakeFieldValue1}',{${fakeFieldName2}} = '${fakeFieldValue2}')`,
    });
    expect(airTableClientAllMock).toHaveBeenCalledTimes(1);
    expect(record).toEqual(fakeRecords[0].fields);

    // Clean up
    airTableClientSpy.mockRestore();
  });
});
