import { faker } from '@faker-js/faker';
import airTable, { addEmptyFields, addLinkedFields, getAllRecords, getRecordById, getRecordByQuery, simplifyAttachmentsData, updateRecordById } from '../../helpers/airTable';
import logging from '../../services/logging';
import { fakeAirTableRecordsRaw, fakeAirTableAttachmentsData } from '../../__test-data__/airTable';

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
    const recordWithBlankFieldsAdded = addEmptyFields(fakeRecord, fakeFieldDefinitions);

    expect(recordWithBlankFieldsAdded).toEqual({
      arrayField: [],
      booleanField: false,
      numberField: 0,
      stringField: '',
    });
  });

  test('addLinkedFields adds into a record the actual data from another AirTable table', async () => {
    // 1. Set up fake test data

    // Data we're putting into our function
    const fakeEventsTableName = faker.lorem.words();
    const fakeEventRecord = {
      _table: {
        name: fakeEventsTableName,
      },
      id: faker.string.uuid(),
      fields: {
        name: 'Microsoft AI',
        date: '2023-02-28',
        time: 50400,
        duration: 3600,
        description: 'What does the future hold\n',
        type: 'Internal',
        series: 'Microsoft',
        speakers: [ 'recJ3qeK5GXidUYxW' ],
      },
    };
    const fakeLinkedFields = [ { fieldName: 'speakers', tableName: 'STA Events Speakers' } ];

    // Data for mocks
    const fakeSpeakersTableName = faker.lorem.words();
    const fakeSpeakerName = faker.person.firstName() + " " + faker.person.lastName();
    const fakeSpeakerUrl = faker.internet.url();
    const fakeSpeakerRecord = {
      _table: {
        name: fakeSpeakersTableName,
      },
      id: faker.string.uuid(),
      fields: {
        name: fakeSpeakerName,
        url: fakeSpeakerUrl,
      },
    };

    // Data we expect to get out of our function
    const expectedResultEventRecord = {
      ...fakeEventRecord,
      fields: {
        ...fakeEventRecord.fields,
        speakers: [
          { name: fakeSpeakerName, url: fakeSpeakerUrl }
        ],
      },
    };

    // 2. Mock dependencies
    const airTableClientFindMock = jest.fn(() => fakeSpeakerRecord);
    const airTableClientTableMock = jest.fn(() => ({ find: airTableClientFindMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));

    // 3. Run our function with test data
    const resultEventRecord = await addLinkedFields(fakeEventsTableName, fakeEventRecord, fakeLinkedFields);

    // 4. Check expectations
    expect(resultEventRecord).toEqual(expectedResultEventRecord);

    // 5. Clean up mocked dependencies
    airTableClientSpy.mockRestore();
  });

  test('getAllRecords gets records from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeRecordsCount = faker.number.int({ min: 10, max: 30 });
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = fakeAirTableRecordsRaw(fakeRecordsCount, fakeTableName);

    // Mock dependencies
    const airTableClientAllMock = jest.fn(() => fakeRecords);
    const airTableClientSelectMock = jest.fn(() => ({ all: airTableClientAllMock }));
    const airTableClientTableMock = jest.fn(() => ({ select: airTableClientSelectMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));

    // Run test
    const allRecords = await getAllRecords(fakeTableName);

    expect(airTableClientSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientSelectMock).toHaveBeenCalledTimes(1);
    expect(airTableClientAllMock).toHaveBeenCalledTimes(1);
    const randomRecordsIndex = faker.number.int(fakeRecordsCount - 1);
    expect(allRecords[randomRecordsIndex]).toEqual(fakeRecords[randomRecordsIndex].fields);

    // Clean up
    airTableClientSpy.mockRestore();
  });

  test('getRecordById gets a record from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = fakeAirTableRecordsRaw(1, fakeTableName);

    // Mock dependencies
    const airTableClientFindMock = jest.fn(() => fakeRecords[0]);
    const airTableClientTableMock = jest.fn(() => ({ find: airTableClientFindMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));
    const logErrorSpy = jest.spyOn(logging, 'logError').mockImplementation(() => {});

    // Run test
    const record = await getRecordById(fakeTableName, fakeRecords[0].id);

    expect(airTableClientSpy).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledTimes(1);
    expect(airTableClientTableMock).toHaveBeenCalledWith(fakeTableName);
    expect(airTableClientFindMock).toHaveBeenCalledTimes(1);
    expect(airTableClientFindMock).toHaveBeenCalledWith(fakeRecords[0].id);
    expect(record).toEqual(fakeRecords[0].fields);

    // Clean up
    airTableClientSpy.mockRestore();
    logErrorSpy.mockRestore();
  });

  test('getRecordByQuery gets a record from AirTable and returns relevant data', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecords = fakeAirTableRecordsRaw(1, fakeTableName);
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
    const logErrorSpy = jest.spyOn(logging, 'logError').mockImplementation(() => {});

    // Run test
    const record = await getRecordByQuery(fakeTableName, {
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
    logErrorSpy.mockRestore();
  });

  test('simplifyAttachmentsData correctly returns a simplified, flattened array', () => {
    // Set up fake test data
    const fakeAttachmentsData = fakeAirTableAttachmentsData(2);

    // Run test
    const simplifiedAttachmentsData = simplifyAttachmentsData(fakeAttachmentsData);

    expect(simplifiedAttachmentsData[0]).toEqual(fakeAttachmentsData[0].url);
    expect(simplifiedAttachmentsData[1]).toEqual(fakeAttachmentsData[1].url);
  });

  test('updateRecordById updates a record in AirTable', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.words(1);
    const fakeRecordId = faker.string.uuid();
    const fakeFields = {
      [faker.lorem.word()]: faker.lorem.words(5),
    };

    // Mock dependencies
    const airTableClientUpdateMock = jest.fn(() => Promise.resolve({}));
    const airTableClientTableMock = jest.fn(() => ({ update: airTableClientUpdateMock }));
    const airTableClientSpy = jest
      .spyOn(airTable, 'client')
      .mockImplementation(() => ({ table: airTableClientTableMock }));
    const logErrorSpy = jest.spyOn(logging, 'logError').mockImplementation(() => {});

    // Run test
    await updateRecordById(fakeTableName, fakeRecordId, fakeFields);

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
    logErrorSpy.mockRestore();
  });
});
