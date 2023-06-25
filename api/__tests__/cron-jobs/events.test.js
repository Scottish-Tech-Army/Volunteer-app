import airTable from '../../helpers/airTable';
import { defaults } from 'axios';
import eventsCronJobs, { addEventsVideoThumbnails, getAllEvents, startGettingNewVideoThumbnails } from '../../cron-jobs/events';
import { faker } from '@faker-js/faker';
import eventsHelper from '../../helpers/events';
import { fakeEventObjects, fakeEventAirTableRecords } from '../../__test-data__/events';
import timing from '../../util/timing';
import logging from '../../services/logging';
import vimeoService from '../../services/vimeo';

defaults.adapter = require('axios/lib/adapters/http');

describe('Test the events cron jobs', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('addEventsVideoThumbnails adds video thumbnails for events that have a video but no thumbnail', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCountMin = 10;
    const fakeEventsCountMax = 20;
    const fakeEventsCountWithoutVideoThumbnail = faker.number.int({ min: 2, max: 5 }); // how many events have a video but don't have a video thumbnail

    let videoThumbnailsRemoved = 0;
    const fakeEvents = fakeEventObjects(faker.number.int({ min: fakeEventsCountMin, max: fakeEventsCountMax }))
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
    const getVideoThumbnailSpy = jest
      .spyOn(vimeoService, 'getVideoThumbnail')
      .mockImplementation(() => Promise.resolve(faker.internet.url()));
    const airTableUpdateRecordByIdSpy = jest
      .spyOn(airTable, 'updateRecordById')
      .mockImplementation(() => Promise.resolve({}));
    const airTableEventsTableSpy = jest.spyOn(airTable, 'eventsTable').mockImplementation(() => fakeTableName);
    const timingDelaySpy = jest.spyOn(timing, 'delay').mockImplementation(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});
    const logErrorSpy = jest.spyOn(logging, 'logError').mockImplementation(() => {});

    // Run the function we're testing
    await addEventsVideoThumbnails(fakeEvents);

    // Check our test expectations are met
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
    logErrorSpy.mockRestore();
  });

  test('getAllEvents gets all events from AirTable', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCount = faker.number.int(20);
    const fakeEvents = fakeEventAirTableRecords(fakeEventsCount);

    // Mock dependencies
    const airTableEventsTableSpy = jest.spyOn(airTable, 'eventsTable').mockImplementation(() => fakeTableName);
    const airTableGetAllRecordsSpy = jest.spyOn(airTable, 'getAllRecords').mockImplementation(() => fakeEvents);
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation((eventAirTableRecord) => eventAirTableRecord);
    const logErrorSpy = jest.spyOn(logging, 'logError').mockImplementation(() => {});

    // Run test
    await getAllEvents();

    expect(airTableEventsTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(fakeEventsCount);

    // Clean up
    airTableEventsTableSpy.mockRestore();
    airTableGetAllRecordsSpy.mockRestore();
    eventsHelperFormatEventFromAirTable.mockRestore();
    logErrorSpy.mockRestore();
  });

  test('startGettingNewVideoThumbnails gets all events then attempts to add video thumbnails', async () => {
    // Set up fake test data
    const fakeEvents = fakeEventObjects(20);

    // Mock dependencies
    const getAllEventsSpy = jest
      .spyOn(eventsCronJobs, 'getAllEvents')
      .mockImplementationOnce(() => Promise.resolve(fakeEvents));
    const addEventsVideoThumbnailsSpy = jest
      .spyOn(eventsCronJobs, 'addEventsVideoThumbnails')
      .mockImplementationOnce(() => Promise.resolve());
    const consoleLogSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

    // Run test
    await startGettingNewVideoThumbnails();

    expect(getAllEventsSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoThumbnailsSpy).toHaveBeenCalledTimes(1);
    expect(addEventsVideoThumbnailsSpy).toHaveBeenCalledWith(fakeEvents);

    // Clean up
    getAllEventsSpy.mockRestore();
    addEventsVideoThumbnailsSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
