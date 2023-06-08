// Provides sample data for events tests

const { faker } = require('@faker-js/faker');

const eventTypes = ['Internal', 'External'];
const durations = [60, 120, 360, 480]; // example event durations in minutes -- 1, 2, 6 and 8 hours
const series = ['', 'Agile Practices', 'Cyber Security', 'Microsoft', 'STA Orientation', 'STA Project Showcase'];
const relatedInitiatives = ['', 'Volunteering app', 'Eleos', 'Climate change app', 'Sole'];
const times = ['10:00', '12:00', '15:30', '19:00'];

function fakeImages() {
  const count = faker.number.int(3);
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
      date = faker.date.between({ from: '2021-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' });
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
    id: faker.string.uuid(),
    name: faker.lorem.words(4),
    date: fakeDate(dateType),
    time: faker.helpers.arrayElement(times),
    duration: faker.helpers.arrayElement(durations),
    description: faker.lorem.sentences(4),
    type: faker.helpers.arrayElement(eventTypes),
    notes: faker.lorem.sentence(),
    series: faker.helpers.arrayElement(series),
    related_initiative: faker.helpers.arrayElement(relatedInitiatives),
    video_webpage: faker.internet.url(),
    video_thumbnail: faker.internet.url(),
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

function fakeEventAirTableRecords(count, dateType, includeVideo = false) {
  const fakeEventObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeEventObjectArray.push(fakeEventAirTableRecord(dateType, includeVideo));
  }

  return fakeEventObjectArray;
}

function fakeEventAirTableRecord(dateType, includeVideo = false) {
  const event = {
    ...fakeEventObject(dateType),
    time: faker.number.int(19) * 60 * 60,
  };

  delete event.notes;

  if (!includeVideo) {
    delete event.video_webpage;
    delete event.video_thumbnail;
  }

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
