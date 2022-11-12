const { faker } = require('@faker-js/faker');

function fakeAirTableAttachmentData() {
  return {
    id: faker.datatype.uuid(),
    width: faker.datatype.number({ min: 300, max: 1200 }),
    height: faker.datatype.number({ min: 300, max: 1200 }),
    url: faker.internet.url(),
    filename: faker.system.commonFileName('jpg'),
    size: faker.datatype.number({ min: 10000, max: 100000 }),
    type: 'image/jpeg',
    thumbnails: {
      small: {
        url: faker.internet.url(),
      },
      large: {
        url: faker.internet.url(),
      },
      full: {
        url: faker.internet.url(),
      },
    },
  };
}

function fakeAirTableAttachmentsData(count) {
  const attachmentsData = [];

  for (let i = 0; i < count; i++) {
    attachmentsData.push(fakeAirTableAttachmentData());
  }

  return attachmentsData;
}

function fakeAirTableRecordRaw(tableName, fields) {
  const recordRaw = {
    _table: {
      name: tableName,
    },
    id: faker.datatype.uuid(),
    fields: {},
  };

  for (const field of fields) {
    let fieldValue;
    switch (field.type) {
      case 'number':
        fieldValue = faker.datatype.number();
        break;
      case 'string':
        fieldValue = faker.lorem.words(5);
        break;
    }

    recordRaw.fields[field.name] = fieldValue;
  }

  return recordRaw;
}

function fakeAirTableRecordsRaw(count, tableName) {
  const fakeAirTableRecordsRawArray = [];
  const fields = [
    {
      name: faker.lorem.words(1),
      type: 'string',
    },
    {
      name: faker.lorem.words(1),
      type: 'string',
    },
    {
      name: faker.lorem.words(1),
      type: 'number',
    },
  ];

  for (let i = 0; i < count; i++) {
    fakeAirTableRecordsRawArray.push(fakeAirTableRecordRaw(tableName, fields));
  }

  return fakeAirTableRecordsRawArray;
}

// Need to add something to get the API to supply the data properly

module.exports = {
  fakeAirTableAttachmentData,
  fakeAirTableAttachmentsData,
  fakeAirTableRecordRaw,
  fakeAirTableRecordsRaw,
};
