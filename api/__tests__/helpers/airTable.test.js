const { faker } = require('@faker-js/faker');
const airTable = require('../../helpers/airTable');
const airTableTestData = require('../../__test-data__/airTable');

describe('Test the AirTable helpers', () => {
  test('addEmptyFields adds all empty fields', () => {
    // Set up fake test data
    const fakeRecord = {};
    const fakeFieldDefinitions = {
      arrayField: {
        type: 'array',
      },
      booleanField: {
        type: 'boolean',
      },
      numberField: {
        type: 'number',
      },
      stringField: {
        type: 'string',
      },
    };

    // Run test
    const recordWithBlankFieldsAdded = airTable.addEmptyFields(fakeRecord, fakeFieldDefinitions);

    expect(recordWithBlankFieldsAdded).toEqual({
      arrayField: [],
      booleanField: false,
      numberField: 0,
      stringField: '',
    });
  });

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

  test('getRecordById gets a record from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = airTableTestData.fakeAirTableRecordsRaw(1, fakeTableName);

    // Mock dependencies
    const airTableClientFindMock = jest.fn(() => fakeRecords[0]);
    const airTableClientTableMock = jest.fn(() => ({ find: airTableClientFindMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));

    // Run test
    const record = await airTable.getRecordById(fakeTableName, fakeRecords[0].id);

    expect(airTableClientSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientFindMock).toHaveBeenCalledTimes(1);
    expect(airTableClientFindMock).toHaveBeenCalledWith(fakeRecords[0].id);
    expect(record).toEqual(fakeRecords[0].fields);

    // Clean up
    airTableClientSpy.mockRestore();
  });

  test('getRecordByQuery gets a record from AirTable and returns relevant data', async () => {
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
    const record = await airTable.getRecordByQuery(fakeTableName, {
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

  test('simplifyAttachmentsData correctly returns a simplified, flattened array', () => {
    // Set up fake test data
    const fakeAttachmentsData = airTableTestData.fakeAirTableAttachmentsData(2);

    // Run test
    const simplifiedAttachmentsData = airTable.simplifyAttachmentsData(fakeAttachmentsData);

    expect(simplifiedAttachmentsData[0]).toEqual(fakeAttachmentsData[0].url);
    expect(simplifiedAttachmentsData[1]).toEqual(fakeAttachmentsData[1].url);
  });

  test('updateRecordById updates a record in AirTable', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecordId = faker.datatype.uuid();
    const fakeFields = {
      [faker.lorem.word()]: faker.lorem.words(5),
    };

    // Mock dependencies
    const airTableClientUpdateMock = jest.fn(() => Promise.resolve({}));
    const airTableClientTableMock = jest.fn(() => ({ update: airTableClientUpdateMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));

    // Run test
    await airTable.updateRecordById(fakeTableName, fakeRecordId, fakeFields);

    expect(airTableClientSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientUpdateMock).toHaveBeenCalledTimes(1);
    expect(airTableClientUpdateMock).toHaveBeenCalledWith([
      {
        id: fakeRecordId,
        fields: fakeFields,
      },
    ]);

    // Clean up
    airTableClientSpy.mockRestore();
  });
});
