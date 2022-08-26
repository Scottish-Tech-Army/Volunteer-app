const airTable = require('../../helpers/airTable');
const axios = require('axios');
const eventsCronJobs = require('../../cron-jobs/events');
const { faker } = require('@faker-js/faker');
const eventsHelper = require('../../helpers/events');
const eventsTestData = require('../../__test-data__/events');
const timing = require('../../util/timing');
const vimeoService = require('../../services/vimeo');

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Test the events cron jobs', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('addEventsVideoFiles adds video files to events that have a video', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCountMin = 10;
    const fakeEventsCountMax = 20;
    const fakeEventsCountWithoutVideoWebpage = faker.datatype.number({ min: 2, max: 5 }); // how many events with no video

    let videoWebpagesRemoved = 0;
    const fakeEvents = eventsTestData
      .fakeEventObjects(faker.datatype.number({ min: fakeEventsCountMin, max: fakeEventsCountMax }))
      // Remove video_webpage from some events, so that we have a mix of events with and without videos,
      // so we can be sure we're only trying to get a video_file when we need to
      .map((event) => {
        if (videoWebpagesRemoved < fakeEventsCountWithoutVideoWebpage) {
          delete event.video_webpage;
          videoWebpagesRemoved++;
        }

        return event;
      });

    const fakeEventsCountWithVideoWebpage = fakeEvents.length - fakeEventsCountWithoutVideoWebpage; // how many events with a video

    // Mock dependencies
    const getVideoFileFromVimeoSpy = jest
      .spyOn(vimeoService, 'getVideoFileFromVimeo')
      .mockImplementation(() => Promise.resolve(faker.internet.url()));
    const airTableUpdateRecordByIdSpy = jest
      .spyOn(airTable, 'updateRecordById')
      .mockImplementation(() => Promise.resolve({}));
    const airTableEventsTableSpy = jest.spyOn(airTable, 'eventsTable').mockImplementation(() => fakeTableName);
    const timingDelaySpy = jest.spyOn(timing, 'delay').mockImplementation(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run the function we're testing
    await eventsCronJobs.addEventsVideoFiles(fakeEvents);

    // Check our test expectations are met
    expect(getVideoFileFromVimeoSpy).toHaveBeenCalledTimes(fakeEventsCountWithVideoWebpage);
    expect(airTableUpdateRecordByIdSpy).toHaveBeenCalledTimes(fakeEventsCountWithVideoWebpage);
    expect(airTableEventsTableSpy).toHaveBeenCalledTimes(fakeEventsCountWithVideoWebpage);
    expect(timingDelaySpy).toHaveBeenCalledTimes(fakeEventsCountWithVideoWebpage);

    // Clean up
    getVideoFileFromVimeoSpy.mockRestore();
    airTableUpdateRecordByIdSpy.mockRestore();
    airTableEventsTableSpy.mockRestore();
    timingDelaySpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('addEventsVideoThumbnails adds video thumbnails for events that have a video but no thumbnail', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCountMin = 10;
    const fakeEventsCountMax = 20;
    const fakeEventsCountWithoutVideoThumbnail = faker.datatype.number({ min: 2, max: 5 }); // how many events have a video but don't have a video thumbnail

    let videoThumbnailsRemoved = 0;
    const fakeEvents = eventsTestData
      .fakeEventObjects(faker.datatype.number({ min: fakeEventsCountMin, max: fakeEventsCountMax }))
      // Remove thumbnails from some events that have videos, to check that thumbnails are only added for events that don't have them
      // so we can be sure we're only adding thumbnails to events that don't have them yet
      .map((event) => {
        if (videoThumbnailsRemoved < fakeEventsCountWithoutVideoThumbnail) {
          delete event.video_thumbnail;
          videoThumbnailsRemoved++;
        }

        return event;
      });

    // Mock dependencies
    const getVideoThumbnailFromVimeoSpy = jest
      .spyOn(vimeoService, 'getVideoThumbnailFromVimeo')
      .mockImplementation(() => Promise.resolve(faker.internet.url()));
    const airTableUpdateRecordByIdSpy = jest
      .spyOn(airTable, 'updateRecordById')
      .mockImplementation(() => Promise.resolve({}));
    const airTableEventsTableSpy = jest.spyOn(airTable, 'eventsTable').mockImplementation(() => fakeTableName);
    const timingDelaySpy = jest.spyOn(timing, 'delay').mockImplementation(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run the function we're testing
    await eventsCronJobs.addEventsVideoThumbnails(fakeEvents);

    // Check our test expectations are met
    expect(getVideoThumbnailFromVimeoSpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);
    expect(airTableUpdateRecordByIdSpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);
    expect(airTableEventsTableSpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);
    expect(timingDelaySpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);

    // Clean up
    getVideoThumbnailFromVimeoSpy.mockRestore();
    airTableUpdateRecordByIdSpy.mockRestore();
    airTableEventsTableSpy.mockRestore();
    timingDelaySpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('getAllEvents gets all events from AirTable', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCount = faker.datatype.number(20);
    const fakeEvents = eventsTestData.fakeEventAirTableRecords(fakeEventsCount);

    // Mock dependencies
    const airTableEventsTableSpy = jest.spyOn(airTable, 'eventsTable').mockImplementation(() => fakeTableName);
    const airTableGetAllRecordsSpy = jest.spyOn(airTable, 'getAllRecords').mockImplementation(() => fakeEvents);
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation((eventAirTableRecord) => eventAirTableRecord);

    // Run test
    await eventsCronJobs.getAllEvents();

    expect(airTableEventsTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(fakeEventsCount);

    // Clean up
    airTableEventsTableSpy.mockRestore();
    airTableGetAllRecordsSpy.mockRestore();
    eventsHelperFormatEventFromAirTable.mockRestore();
  });

  test('startGettingNewVideoThumbnails gets all events then attempts to add video thumbnails', async () => {
    // Set up fake test data
    const fakeEvents = eventsTestData.fakeEventObjects(20);

    // Mock dependencies
    const getAllEventsSpy = jest
      .spyOn(eventsCronJobs, 'getAllEvents')
      .mockImplementationOnce(() => Promise.resolve(fakeEvents));
    const addEventsVideoThumbnailsSpy = jest
      .spyOn(eventsCronJobs, 'addEventsVideoThumbnails')
      .mockImplementationOnce(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run test
    await eventsCronJobs.startGettingNewVideoThumbnails();

    expect(getAllEventsSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoThumbnailsSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoThumbnailsSpy).toHaveBeenCalledWith(fakeEvents);

    // Clean up
    getAllEventsSpy.mockRestore();
    addEventsVideoThumbnailsSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('startGettingVideoFiles gets all events then attempts to add video files', async () => {
    // Set up fake test data
    const fakeEvents = eventsTestData.fakeEventObjects(20);

    // Mock dependencies
    const getAllEventsSpy = jest
      .spyOn(eventsCronJobs, 'getAllEvents')
      .mockImplementationOnce(() => Promise.resolve(fakeEvents));
    const addEventsVideoFilesSpy = jest
      .spyOn(eventsCronJobs, 'addEventsVideoFiles')
      .mockImplementationOnce(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run test
    await eventsCronJobs.startGettingVideoFiles();

    expect(getAllEventsSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoFilesSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoFilesSpy).toHaveBeenCalledWith(fakeEvents);

    // Clean up
    getAllEventsSpy.mockRestore();
    addEventsVideoFilesSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
