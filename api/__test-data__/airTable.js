const { faker } = require('@faker-js/faker');

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

module.exports = {
  fakeAirTableRecordRaw,
  fakeAirTableRecordsRaw,
};
