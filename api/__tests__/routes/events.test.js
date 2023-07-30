import airTable from '../../helpers/airTable'
import { defaults, get } from 'axios'
import eventsHelper from '../../helpers/events'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import routesHelper from '../../helpers/routes'
import { getEventHandler, getEventsHandler, getScheduledEventsHandler } from '../../routes/events'
import { fakeEventObjects, fakeEventObject, fakeEventAirTableRecords, fakeEventAirTableRecord } from '../../__test-data__/events'
import nock from 'nock'

defaults.adapter = require('axios/lib/adapters/http')

describe('Test the events api', () => {
  test('GET all method should respond successfully', async () => {
    // Set up fake test data
    const fakeAllEvents = fakeEventObjects(10)

    // Mock dependencies
    const requestMock = nock('http://localhost:3000')
      .get('/events')
      .reply(200, fakeAllEvents)

    // Run test
    const response = await get('http://localhost:3000/events')
    requestMock.done()

    expect(response.status).toBe(200)
    expect(response.data).toEqual(fakeAllEvents)
  })

  test('GET single event should respond successfully', async () => {
    // Set up fake test data
    const fakeEvent = fakeEventObject()

    // Mock dependencies
    const requestMock = nock('http://localhost:3000')
      .get(`/events/${fakeEvent.id}`)
      .reply(200, fakeEvent)

    // Run test
    const response = await get(
      `http://localhost:3000/events/${fakeEvent.id}`,
    )
    requestMock.done()

    expect(response.status).toBe(200)
    expect(response.data).toEqual(fakeEvent)
  })

  test('GET past events should respond successfully', async () => {
    // Set up fake test data
    const fakePastEvents = fakeEventObjects(5, 'past')

    // Mock dependencies
    const requestMock = nock('http://localhost:3000')
      .get('/events/scheduled/past')
      .reply(200, fakePastEvents)

    // Run test
    const response = await get(
      'http://localhost:3000/events/scheduled/past',
    )
    requestMock.done()

    expect(response.status).toBe(200)
    expect(response.data).toEqual(fakePastEvents)
  })

  test('GET upcoming events should respond successfully', async () => {
    // Set up fake test data
    const fakeFutureEvents = fakeEventObjects(5, 'future')

    // Mock dependencies
    const requestMock = nock('http://localhost:3000')
      .get('/events/scheduled/upcoming')
      .reply(200, fakeFutureEvents)

    // Run test
    const response = await get(
      'http://localhost:3000/events/scheduled/upcoming',
    )
    requestMock.done()

    expect(response.status).toBe(200)
    expect(response.data).toEqual(fakeFutureEvents)
  })

  test('getEventsHandler gets all records from AirTable, formats data and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word()
    const fakeEventsCount = faker.number.int(10)
    const fakeEvents = fakeEventAirTableRecords(fakeEventsCount)

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName)
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => fakeEvents)
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation(eventAirTableRecord => eventAirTableRecord)
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    }

    // Run test
    await getEventsHandler({}, responseMock)

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1)
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1)
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(
      fakeEventsCount,
    )
    expect(responseMock.status).toHaveBeenCalledTimes(1)
    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(responseMock.send).toHaveBeenCalledTimes(1)
    expect(responseMock.send).toHaveBeenCalledWith(fakeEvents)

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore()
    airTableHelperGetAllRecordsSpy.mockRestore()
    eventsHelperFormatEventFromAirTable.mockRestore()
  })

  test('getEventHandler gets a single record from AirTable, formats data and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word()
    const fakeEvent = fakeEventAirTableRecord()
    const fakeRequest = {
      params: {
        id: fakeEvent.id,
      },
    }

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName)
    const airTableHelperGetRecordByIdSpy = jest
      .spyOn(airTable, 'getRecordById')
      .mockImplementation(() => fakeEvent)
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation(eventAirTableRecord => eventAirTableRecord)
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    }

    // Run test
    await getEventHandler(fakeRequest, responseMock)

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1)
    expect(airTableHelperGetRecordByIdSpy).toHaveBeenCalledTimes(1)
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(1)
    expect(responseMock.status).toHaveBeenCalledTimes(1)
    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(responseMock.send).toHaveBeenCalledTimes(1)
    expect(responseMock.send).toHaveBeenCalledWith(fakeEvent)

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore()
    airTableHelperGetRecordByIdSpy.mockRestore()
    eventsHelperFormatEventFromAirTable.mockRestore()
  })

  test('getScheduledEventsHandler gets past events and returns a response', async () => {
    // Set up fake test data
    const fakeRequest = {
      params: {
        schedule: 'past',
      },
    }
    const fakeTableName = faker.lorem.word()
    const fakePastEventsCount = faker.number.int(10)
    const fakeFutureEventsCount = faker.number.int(10)
    const fakePastEvents = fakeEventAirTableRecords(
      fakePastEventsCount,
      'past',
    )
    const fakeFutureEvents = fakeEventAirTableRecords(
      fakeFutureEventsCount,
      'future',
    )
    const fakeAllEvents = [...fakePastEvents, ...fakeFutureEvents]

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName)
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => fakeAllEvents)
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation(eventAirTableRecord => eventAirTableRecord)
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    }

    // Run test
    await getScheduledEventsHandler(fakeRequest, responseMock)

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1)
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1)
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(
      fakePastEventsCount + fakeFutureEventsCount,
    )
    expect(responseMock.status).toHaveBeenCalledTimes(1)
    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(responseMock.send).toHaveBeenCalledTimes(1)
    for (let i = 0; i < fakePastEventsCount.length; i++) {
      expect(responseMock.send).toHaveBeenCalledWith(
        expect.arrayContaining(fakePastEvents[i]),
      )
    }
    for (let i = 0; i < fakeFutureEventsCount.length; i++) {
      expect(responseMock.send).not.toHaveBeenCalledWith(
        expect.arrayContaining(fakeFutureEvents[i]),
      )
    }

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore()
    airTableHelperGetAllRecordsSpy.mockRestore()
    eventsHelperFormatEventFromAirTable.mockRestore()
  })

  test('getScheduledEventsHandler gets upcoming events and returns a response', async () => {
    // Set up fake test data
    const fakeRequest = {
      params: {
        schedule: 'upcoming',
      },
    }
    const fakeTableName = faker.lorem.word()
    const fakePastEventsCount = faker.number.int(5)
    const fakeFutureEventsCount = faker.number.int(5)
    const fakePastEvents = fakeEventAirTableRecords(
      fakePastEventsCount,
      'past',
    )
    const fakeFutureEvents = fakeEventAirTableRecords(
      fakeFutureEventsCount,
      'future',
    )
    const fakeAllEvents = [...fakePastEvents, ...fakeFutureEvents]

    // Mock dependencies
    const airTableHelperEventsTableTableSpy = jest
      .spyOn(airTable, 'eventsTable')
      .mockImplementation(() => fakeTableName)
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => fakeAllEvents)
    const eventsHelperFormatEventFromAirTable = jest
      .spyOn(eventsHelper, 'formatEventFromAirTable')
      .mockImplementation(eventAirTableRecord => eventAirTableRecord)
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    }

    // Run test
    await getScheduledEventsHandler(fakeRequest, responseMock)

    expect(airTableHelperEventsTableTableSpy).toHaveBeenCalledTimes(1)
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1)
    expect(eventsHelperFormatEventFromAirTable).toHaveBeenCalledTimes(
      fakePastEventsCount + fakeFutureEventsCount,
    )
    expect(responseMock.status).toHaveBeenCalledTimes(1)
    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(responseMock.send).toHaveBeenCalledTimes(1)
    for (let i = 0; i < fakeFutureEventsCount.length; i++) {
      expect(responseMock.send).toHaveBeenCalledWith(
        expect.arrayContaining(fakeFutureEvents[i]),
      )
    }
    for (let i = 0; i < fakePastEventsCount.length; i++) {
      expect(responseMock.send).not.toHaveBeenCalledWith(
        expect.arrayContaining(fakePastEvents[i]),
      )
    }

    // Clean up
    airTableHelperEventsTableTableSpy.mockRestore()
    airTableHelperGetAllRecordsSpy.mockRestore()
    eventsHelperFormatEventFromAirTable.mockRestore()
  })
})
