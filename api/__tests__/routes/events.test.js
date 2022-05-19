const airTable = require('../../helpers/airTable');
const axios = require('axios');
const eventsHelper = require('../../helpers/events');
const { faker } = require('@faker-js/faker');
const request = require('supertest');
const routesHelper = require('../../helpers/routes');
const { getEventHandler, getEventsHandler, getScheduledEventsHandler } = require('../../routes/events');
const eventsTestData = require('../../__test-data__/events');
const nock = require('nock');

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Test the events api', () => {
  test('GET all method should respond successfully', async () => {
    // Set up fake test data
    const fakeAllEvents = eventsTestData.fakeEventObjects(10);

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get('/events').reply(200, fakeAllEvents);

    // Run test
    const response = await axios.get('http://localhost:3000/events');
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakeAllEvents);
  });

  test('GET single event should respond successfully', async () => {
    // Set up fake test data
    const fakeEvent = eventsTestData.fakeEventObject();

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get(`/events/${fakeEvent.id}`).reply(200, fakeEvent);

    // Run test
    const response = await axios.get(`http://localhost:3000/events/${fakeEvent.id}`);
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakeEvent);
  });

  test('GET past events should respond successfully', async () => {
    // Set up fake test data
    const fakePastEvents = eventsTestData.fakeEventObjects(5, 'past');

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get('/events/scheduled/past').reply(200, fakePastEvents);

    // Run test
    const response = await axios.get('http://localhost:3000/events/scheduled/past');
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakePastEvents);
  });

  test('GET upcoming events should respond successfully', async () => {
    // Set up fake test data
    const fakeFutureEvents = eventsTestData.fakeEventObjects(5, 'future');

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get('/events/scheduled/upcoming').reply(200, fakeFutureEvents);

    // Run test
    const response = await axios.get('http://localhost:3000/events/scheduled/upcoming');
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakeFutureEvents);
  });

  test('getEventsHandler gets all records from AirTable, formats data and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEventsCount = faker.datatype.number(10);
    const fakeEvents = eventsTestData.fakeEventAirTableRecords(fakeEventsCount);

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetAllRecordsSpy = jest.spyOn(airTable, 'getAllRecords').mockImplementation(() => fakeEvents);
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation((eventAirTableRecord) => eventAirTableRecord);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getEventsHandler({}, responseMock);

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(fakeEventsCount);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(fakeEvents);

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore();
    airTableHelperGetAllRecordsSpy.mockRestore();
    eventsHelperFormatEventFromAirTable.mockRestore();
  });

  test('getEventHandler gets a single record from AirTable, formats data and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeEvent = eventsTestData.fakeEventAirTableRecord();
    const fakeRequest = {
      params: {
        id: fakeEvent.id,
      },
    };

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetRecordByIdSpy = jest.spyOn(airTable, 'getRecordById').mockImplementation(() => fakeEvent);
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation((eventAirTableRecord) => eventAirTableRecord);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getEventHandler(fakeRequest, responseMock);

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByIdSpy).toHaveBeenCalledTimes(1);
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(fakeEvent);

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore();
    airTableHelperGetRecordByIdSpy.mockRestore();
    eventsHelperFormatEventFromAirTable.mockRestore();
  });

  test('getScheduledEventsHandler gets past events and returns a response', async () => {
    // Set up fake test data
    const fakeRequest = {
      params: {
        schedule: 'past',
      },
    };
    const fakeTableName = faker.lorem.word();
    const fakePastEventsCount = faker.datatype.number(5);
    const fakeFutureEventsCount = faker.datatype.number(5);
    const fakePastEvents = eventsTestData.fakeEventAirTableRecords(fakePastEventsCount, 'past');
    const fakeFutureEvents = eventsTestData.fakeEventAirTableRecords(fakeFutureEventsCount, 'future');
    const fakeAllEvents = [...fakePastEvents, ...fakeFutureEvents];

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => fakeAllEvents);
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation((eventAirTableRecord) => eventAirTableRecord);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getScheduledEventsHandler(fakeRequest, responseMock);

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(fakePastEventsCount + fakeFutureEventsCount);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(fakePastEvents);

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore();
    airTableHelperGetAllRecordsSpy.mockRestore();
    eventsHelperFormatEventFromAirTable.mockRestore();
  });

  test('getScheduledEventsHandler gets upcoming events and returns a response', async () => {
    // Set up fake test data
    const fakeRequest = {
      params: {
        schedule: 'upcoming',
      },
    };
    const fakeTableName = faker.lorem.word();
    const fakePastEventsCount = faker.datatype.number(5);
    const fakeFutureEventsCount = faker.datatype.number(5);
    const fakePastEvents = eventsTestData.fakeEventAirTableRecords(fakePastEventsCount, 'past');
    const fakeFutureEvents = eventsTestData.fakeEventAirTableRecords(fakeFutureEventsCount, 'future');
    const fakeAllEvents = [...fakePastEvents, ...fakeFutureEvents];

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => fakeAllEvents);
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation((eventAirTableRecord) => eventAirTableRecord);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getScheduledEventsHandler(fakeRequest, responseMock);

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(fakePastEventsCount + fakeFutureEventsCount);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(fakeFutureEvents);

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore();
    airTableHelperGetAllRecordsSpy.mockRestore();
    eventsHelperFormatEventFromAirTable.mockRestore();
  });
});
