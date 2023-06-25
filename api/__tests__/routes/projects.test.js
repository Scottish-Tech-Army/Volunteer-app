import airTable from '../../helpers/airTable';
import app from '../../app';
import { defaults, get, post } from 'axios';
import { faker } from '@faker-js/faker';
import nock from 'nock';
import { getAllProjectsHandler, projectRegisterInterestHandler } from '../../routes/projects';
import projectsHelper from '../../helpers/projects';
import { fakeProjectResourceObjects, fakeAirTableProjectResource, fakeProjectResourceObject } from '../../__test-data__/projects';
import request from 'supertest';
import routesHelper from '../../helpers/routes';
import slackService from '../../services/slack';

defaults.adapter = require('axios/lib/adapters/http');

describe('Test the projects api', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('GET all method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResources = fakeProjectResourceObjects(
      faker.number.int({ min: 30, max: 50 }),
    );

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get('/projects').reply(200, fakeProjectResources);

    // Run test
    const response = await get('http://localhost:3000/projects');
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakeProjectResources);
  });

  test('getAllProjectsHandler calls AirTable and returns a response', async () => {
    // Set up fake test data
    const fakeRequest = {
      query: {},
      body: {},
    };
    const fakeTableName = faker.lorem.word();
    const numberOfProjects = faker.number.int({ min: 10, max: 30 });
    const fakeProjectResources = [];
    for (let i = 0; i < numberOfProjects; i++) {
      fakeProjectResources.push(fakeAirTableProjectResource(true));
    }

    // Mock dependencies
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => fakeProjectResources);
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(fakeProjectResource => fakeProjectResource);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getAllProjectsHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(numberOfProjects);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(fakeProjectResources);

    // Clean up
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetAllRecordsSpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
  });

  test('getAllProjectsHandler returns an error if AirTable has an error', async () => {
    // Set up fake test data
    const fakeRequest = {
      query: {},
      body: {},
    };
    const fakeTableName = faker.lorem.word();

    // Mock dependencies
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => ({ error: 'Some error message' }));
    const routesHelperSendErrorSpy = jest
      .spyOn(routesHelper, 'sendError')
      .mockImplementation(() => {});
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(fakeProjectResource => fakeProjectResource);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getAllProjectsHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(routesHelperSendErrorSpy).toHaveBeenCalledTimes(1);
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(0);
    expect(responseMock.status).toHaveBeenCalledTimes(0);
    expect(responseMock.send).toHaveBeenCalledTimes(0);

    // Clean up
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetAllRecordsSpy.mockRestore();
    routesHelperSendErrorSpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
  });

  test('getAllProjectsHandler returns an error if AirTable returns no projects', async () => {
    // Set up fake test data
    const fakeRequest = {
      query: {},
      body: {},
    };
    const fakeTableName = faker.lorem.word();

    // Mock dependencies
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetAllRecordsSpy = jest
      .spyOn(airTable, 'getAllRecords')
      .mockImplementation(() => undefined);
    const routesHelperSendErrorSpy = jest
      .spyOn(routesHelper, 'sendError')
      .mockImplementation(() => {});
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(fakeProjectResource => fakeProjectResource);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getAllProjectsHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetAllRecordsSpy).toHaveBeenCalledTimes(1);
    expect(routesHelperSendErrorSpy).toHaveBeenCalledTimes(1);
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(0);
    expect(responseMock.status).toHaveBeenCalledTimes(0);
    expect(responseMock.send).toHaveBeenCalledTimes(0);

    // Clean up
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetAllRecordsSpy.mockRestore();
    routesHelperSendErrorSpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
  });

  test('GET single project by ID method should return Not Found', async () => {
    const response = await request(app).get('/projects/1');
    expect(response.statusCode).toBe(404);
  });

  test('GET a single project method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResource = fakeProjectResourceObject();

    // Mock dependencies
    const singleProjectsMock = nock('http://localhost:3000')
      .get(`/projects/single?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`)
      .reply(200, fakeProjectResource);

    // Run test
    const response = await get(
      `http://localhost:3000/projects/single?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`,
    );

    singleProjectsMock.done();

    expect(response.status).toBe(200);
    expect(response.data.res_id).toBe(fakeProjectResource.res_id);
    expect(response.data.it_key).toBe(fakeProjectResource.it_key);
  });

  test('POST register interest in a single project method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResource = fakeProjectResourceObject();
    const postData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      happyToMentor: faker.datatype.boolean(),
      lookingForBuddy: faker.datatype.boolean(),
      availableFrom: '2022-12-31',
    };
    const responseData = {
      data: 'success',
    };

    // Mock dependencies
    const requestMock = nock('http://localhost:3000')
      .post(`/projects/single/register-interest?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`)
      .reply(200, responseData);

    // Run test
    const response = await post(
      `http://localhost:3000/projects/single/register-interest?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`,
    );
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test('projectRegisterInterestHandler calls AirTable and Slack and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = fakeAirTableProjectResource(true);
    const fakeRequest = {
      query: {
        it: fakeProjectResource.it_key,
        res: fakeProjectResource.res_id,
      },
      body: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        lookingForPeerSupport: faker.datatype.boolean(),
        availableFrom: '2022-12-31',
      },
    };

    // Mock dependencies
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetRecordByQuerySpy = jest
      .spyOn(airTable, 'getRecordByQuery')
      .mockImplementation(() => fakeProjectResource);
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(() => fakeProjectResource);
    const slackServicePostMessageSpy = jest
      .spyOn(slackService, 'postMessage')
      .mockImplementation(() => ({ data: 'success' }));
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await projectRegisterInterestHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledWith(fakeTableName, {
      it_key: fakeRequest.query.it,
      res_id: fakeRequest.query.res,
    });
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(1);
    expect(slackServicePostMessageSpy).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith({ data: 'success' });

    // Clean up
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetRecordByQuerySpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
    slackServicePostMessageSpy.mockRestore();
  });

  test('projectRegisterInterestHandler returns an error if project cannot be found', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = fakeAirTableProjectResource(true);
    const fakeRequest = {
      query: {
        it: fakeProjectResource.it_key,
        res: fakeProjectResource.res_id,
      },
      body: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        lookingForPeerSupport: faker.datatype.boolean(),
        availableFrom: '2022-12-31',
      },
    };

    // Mock dependencies
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetRecordByQuerySpy = jest
      .spyOn(airTable, 'getRecordByQuery')
      .mockImplementation(() => undefined);
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(() => fakeProjectResource);
    const slackServicePostMessageSpy = jest
      .spyOn(slackService, 'postMessage')
      .mockImplementation(() => ({ data: 'success' }));
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await projectRegisterInterestHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledWith(fakeTableName, {
      it_key: fakeRequest.query.it,
      res_id: fakeRequest.query.res,
    });
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).not.toHaveBeenCalled();
    expect(slackServicePostMessageSpy).not.toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).not.toHaveBeenCalledWith({ data: 'success' });

    // Clean up
    consoleErrorSpy.mockRestore();
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetRecordByQuerySpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
    slackServicePostMessageSpy.mockRestore();
  });

  test('projectRegisterInterestHandler returns an error if data is missing from the request', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = fakeAirTableProjectResource(true);
    const fakeRequest = {
      query: {
        it: fakeProjectResource.it_key,
        res: fakeProjectResource.res_id,
      },
      body: {},
    };

    // Mock dependencies
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetRecordByQuerySpy = jest
      .spyOn(airTable, 'getRecordByQuery')
      .mockImplementation(() => fakeProjectResource);
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(() => fakeProjectResource);
    const slackServicePostMessageSpy = jest
      .spyOn(slackService, 'postMessage')
      .mockImplementation(() => ({ data: 'success' }));
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await projectRegisterInterestHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledWith(fakeTableName, {
      it_key: fakeRequest.query.it,
      res_id: fakeRequest.query.res,
    });
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(1);
    expect(slackServicePostMessageSpy).not.toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).not.toHaveBeenCalledWith({ data: 'success' });

    // Clean up
    consoleErrorSpy.mockRestore();
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetRecordByQuerySpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
    slackServicePostMessageSpy.mockRestore();
  });

  test('projectRegisterInterestHandler returns an error if Slack service returns an error', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = fakeAirTableProjectResource(true);
    const fakeRequest = {
      query: {
        it: fakeProjectResource.it_key,
        res: fakeProjectResource.res_id,
      },
      body: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        lookingForPeerSupport: faker.datatype.boolean(),
        availableFrom: '2022-12-31',
      },
    };
    const slackErrorResponse = { error: 'Some error message' };

    // Mock dependencies
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    const airTableHelperProjectsResourcesCacheTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetRecordByQuerySpy = jest
      .spyOn(airTable, 'getRecordByQuery')
      .mockImplementation(() => fakeProjectResource);
    const projectsHelperFormatProjectResourceFromAirTableSpy = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation(() => fakeProjectResource);
    const slackServicePostMessageSpy = jest
      .spyOn(slackService, 'postMessage')
      .mockImplementation(() => slackErrorResponse);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await projectRegisterInterestHandler(fakeRequest, responseMock);

    expect(airTableHelperProjectsResourcesCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledWith(fakeTableName, {
      it_key: fakeRequest.query.it,
      res_id: fakeRequest.query.res,
    });
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(1);
    expect(slackServicePostMessageSpy).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(slackErrorResponse);

    // Clean up
    consoleErrorSpy.mockRestore();
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetRecordByQuerySpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
    slackServicePostMessageSpy.mockRestore();
  });
});
