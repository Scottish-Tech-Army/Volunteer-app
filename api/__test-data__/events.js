const { faker } = require('@faker-js/faker');

const eventTypes = ['Internal', 'External'];
const durations = [60, 120, 360, 480]; // example event durations in minutes -- 1, 2, 6 and 8 hours
const series = ['', 'Agile Practices', 'Cyber Security', 'Microsoft', 'STA Orientation', 'STA Project Showcase'];
const times = ['10:00', '12:00', '15:30', '19:00'];

function fakeImages() {
  const count = faker.datatype.number(3);
  const images = [];

  if (count) {
    for (let i = 0; i < count; i++) {
      images.push(faker.internet.url());
    }
  }

  return images;
}

function fakeDate(type) {
  let date;

  switch (type) {
    case 'any':
    default:
      date = faker.date.between('2021-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z');
      break;
    case 'future':
      date = faker.date.future();
      break;
    case 'past':
      date = faker.date.past();
      break;
  }

  return date.toISOString().substring(0, 10);
}

function fakeEventObject(dateType) {
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.words(4),
    date: fakeDate(dateType),
    time: faker.random.arrayElement(times),
    duration: faker.random.arrayElement(durations),
    description: faker.lorem.sentences(4),
    type: faker.random.arrayElement(eventTypes),
    notes: faker.lorem.sentence(),
    series: faker.random.arrayElement(series),
    video: faker.internet.url(),
    images: fakeImages(),
  };
}

function fakeEventObjects(count, dateType) {
  const fakeEventObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeEventObjectArray.push(fakeEventObject(dateType));
  }

  return fakeEventObjectArray;
}

function fakeEventAirTableRecords(count, dateType) {
  const fakeEventObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeEventObjectArray.push(fakeEventAirTableRecord(dateType));
  }

  return fakeEventObjectArray;
}

function fakeEventAirTableRecord(dateType) {
  const event = {
    ...fakeEventObject(dateType),
    time: faker.datatype.number(19) * 60 * 60,
  };

  delete event.description;
  delete event.notes;
  delete event.video;

  return event;
}

module.exports = {
  fakeDate,
  fakeEventObject,
  fakeEventObjects,
  fakeEventAirTableRecords,
  fakeEventAirTableRecord,
  fakeImages,
};
