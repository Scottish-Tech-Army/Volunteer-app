const airTable = require('../../helpers/airTable');
const { faker } = require('@faker-js/faker');
const eventsHelpers = require('../../helpers/events');
const eventsTestData = require('../../__test-data__/events');

describe('Test the events helpers', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('formatEventFromAirTable correctly formats data', async () => {
    // Set up fake test data
    const fakeEventFromAirTable = eventsTestData.fakeEventAirTableRecord('any', true);
    const fakeSimplifiedAttachmentsData = [faker.internet.url()];

    // Mock dependencies
    const simplifyAttachmentsDataSpy = jest
      .spyOn(airTable, 'simplifyAttachmentsData')
      .mockImplementation(() => fakeSimplifiedAttachmentsData);
    const addEmptyFieldsSpy = jest.spyOn(airTable, 'addEmptyFields').mockImplementation((event) => event);
    const formatDurationSpy = jest.spyOn(airTable, 'formatDuration').mockImplementation((duration) => duration);
    const formatTimeSpy = jest.spyOn(airTable, 'formatTime').mockImplementation((time) => time);

    // Run test
    const formattedEvent = eventsHelpers.formatEventFromAirTable(fakeEventFromAirTable);

    // simplifyAttachmentsData should be called once for images, once for video_thumbnail 
    expect(simplifyAttachmentsDataSpy).toHaveBeenCalledTimes(2);
    expect(formattedEvent.video_thumbnail).toEqual(fakeSimplifiedAttachmentsData[0]);
    expect(formatDurationSpy).toHaveBeenCalledTimes(1);
    expect(formatTimeSpy).toHaveBeenCalledTimes(1);

    // Clean up
    simplifyAttachmentsDataSpy.mockRestore();
    addEmptyFieldsSpy.mockRestore();
    formatDurationSpy.mockRestore();
    formatTimeSpy.mockRestore();
  });
});
