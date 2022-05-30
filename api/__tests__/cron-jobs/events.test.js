const airTable = require('../../helpers/airTable');
const axios = require('axios');
const eventsCronJobs = require('../../cron-jobs/events');
const { faker } = require('@faker-js/faker');
const eventsHelper = require('../../helpers/events');
const eventsTestData = require('../../__test-data__/events');
const timing = require('../../util/timing');

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Test the events get video thumbnails cron job', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('addEventsVideoThumbnailIfNeeded attempts to add video thumbnails for events tha need them', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCountMin = 10;
    const fakeEventsCountMax = 20;
    const fakeEventsCountWithoutVideoThumbnail = faker.datatype.number({ min: 2, max: 5 });

    let videoThumbnailsRemoved = 0;
    let fakeEvents = eventsTestData
      .fakeEventObjects(faker.datatype.number({ min: fakeEventsCountMin, max: fakeEventsCountMax }))
      .map((event) => {
        if (videoThumbnailsRemoved < fakeEventsCountWithoutVideoThumbnail) {
          delete event.video_thumbnail;
          videoThumbnailsRemoved++;
        }

        return event;
      });

    // Mock dependencies
    const getVideoThumbnailSpy = jest
      .spyOn(eventsCronJobs, 'getVideoThumbnail')
      .mockImplementation(() => Promise.resolve(faker.internet.url()));
    const airTableUpdateRecordByIdSpy = jest
      .spyOn(airTable, 'updateRecordById')
      .mockImplementation(() => Promise.resolve({}));
    const airTableEventsTableSpy = jest.spyOn(airTable, 'eventsTable').mockImplementation(() => fakeTableName);
    const timingDelaySpy = jest.spyOn(timing, 'delay').mockImplementation(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run test
    await eventsCronJobs.addEventsVideoThumbnailIfNeeded(fakeEvents);

    expect(getVideoThumbnailSpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);
    expect(airTableUpdateRecordByIdSpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);
    expect(airTableEventsTableSpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);
    expect(timingDelaySpy).toHaveBeenCalledTimes(fakeEventsCountWithoutVideoThumbnail);

    // Clean up
    getVideoThumbnailSpy.mockRestore();
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

  test('getVideoThumbnail calls the Vimeo API and returns the thumbnail URL', async () => {
    // Set up fake test data
    const fakeVimeoVideoId = faker.datatype.number({ min: 10000000, max: 99999999 });
    const fakeVideoUrl = `https://vimeo.com/${fakeVimeoVideoId}`;
    const fakeThumbnailUrlBase = faker.internet.url();
    const fakeThumbnailUrl960 = faker.internet.url();
    const fakeThumbnailUrl1280 = faker.internet.url();
    const fakeAxiosVimeoResponse = {
      data: {
        video: {
          thumbs: {
            base: fakeThumbnailUrlBase,
            960: fakeThumbnailUrl960,
            1280: fakeThumbnailUrl1280,
          },
        },
      },
      status: 200,
    };

    // Mock dependencies
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(fakeAxiosVimeoResponse));
    const getVimeoVideoIdFromUrlSpy = jest
      .spyOn(eventsCronJobs, 'getVimeoVideoIdFromUrl')
      .mockImplementationOnce(() => fakeVimeoVideoId);

    // Run test
    const thumbnailUrl = await eventsCronJobs.getVideoThumbnail(fakeVideoUrl);

    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(getVimeoVideoIdFromUrlSpy).toHaveBeenCalledTimes(1);
    expect(thumbnailUrl).toEqual(fakeThumbnailUrl1280);

    // Clean up
    axiosSpy.mockRestore();
    getVimeoVideoIdFromUrlSpy.mockRestore();
  });

  test('getVimeoVideoIdFromUrl correctly returns the Vimeo video ID', () => {
    // Set up fake test data
    const fakeVimeoVideoId = faker.datatype.number({ min: 10000000, max: 99999999 });
    const fakeVimeoVideoUrl = `https://vimeo.com/${fakeVimeoVideoId}?possibleParameter=xyz#possible-hash`;

    // Run test
    const videoId = eventsCronJobs.getVimeoVideoIdFromUrl(fakeVimeoVideoUrl);

    expect(videoId).toEqual(fakeVimeoVideoId.toString());
  });

  test('startGettingNewVideoThumbnails gets all events then attempts to add video thumbnails', async () => {
    // Set up fake test data
    const fakeEvents = eventsTestData.fakeEventObjects(20);

    // Mock dependencies
    const getAllEventsSpy = jest
      .spyOn(eventsCronJobs, 'getAllEvents')
      .mockImplementationOnce(() => Promise.resolve(fakeEvents));
    const addEventsVideoThumbnailIfNeededSpy = jest
      .spyOn(eventsCronJobs, 'addEventsVideoThumbnailIfNeeded')
      .mockImplementationOnce(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run test
    await eventsCronJobs.startGettingNewVideoThumbnails();

    expect(getAllEventsSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoThumbnailIfNeededSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoThumbnailIfNeededSpy).toHaveBeenCalledWith(fakeEvents);

    // Clean up
    getAllEventsSpy.mockRestore();
    addEventsVideoThumbnailIfNeededSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
