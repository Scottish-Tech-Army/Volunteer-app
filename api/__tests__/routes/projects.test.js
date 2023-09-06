const airTable = require('../../helpers/airTable');
const app = require('../../app');
const axios = require('axios');
const dayjs = require('dayjs');
const { faker } = require('@faker-js/faker');
const nock = require('nock');
const { getAllProjectsHandler, projectRegisterInterestHandler } = require('../../routes/projects');
const projectsHelper = require('../../helpers/projects');
const projectsTestData = require('../../__test-data__/projects');
const request = require('supertest');
const routesHelper = require('../../helpers/routes');
const slackService = require('../../services/slack');

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Test the projects api', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('GET all method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResources = projectsTestData.fakeProjectResourceObjects(
      faker.number.int({ min: 30, max: 50 }),
    );

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get('/projects').reply(200, fakeProjectResources);

    // Run test
    const response = await axios.get('http://localhost:3000/projects');
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
      fakeProjectResources.push(projectsTestData.fakeAirTableProjectResource(true));
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
      .mockImplementation(() => { });
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
      .mockImplementation(() => { });
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
    const fakeProjectResource = projectsTestData.fakeProjectResourceObject();

    // Mock dependencies
    const singleProjectsMock = nock('http://localhost:3000')
      .get(`/projects/single?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`)
      .reply(200, fakeProjectResource);

    // Run test
    const response = await axios.get(
      `http://localhost:3000/projects/single?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`,
    );

    singleProjectsMock.done();

    expect(response.status).toBe(200);
    expect(response.data.res_id).toBe(fakeProjectResource.res_id);
    expect(response.data.it_key).toBe(fakeProjectResource.it_key);
  });

  test('POST register interest in a single project method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResource = projectsTestData.fakeProjectResourceObject();
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
    const response = await axios.post(
      `http://localhost:3000/projects/single/register-interest?res=${fakeProjectResource.res_id}&it=${fakeProjectResource.it_key}`,
    );
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test('projectRegisterInterestHandler calls AirTable and Slack and returns a response', async () => {
    // Set up fake test data
    const fakeProjectsResourcesCacheTableName = faker.lorem.word();
    const fakeProjectsRegisterInterestTableName = faker.lorem.word();
    const fakeProjectResource = projectsTestData.fakeAirTableProjectResource(true);
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
      .mockImplementation(() => fakeProjectsResourcesCacheTableName);
    const airTableHelperProjectsRegisterInterestCacheTableSpy = jest
      .spyOn(airTable, 'projectsRegisterInterestTable')
      .mockImplementation(() => fakeProjectsRegisterInterestTableName);
    const airTableHelperGetRecordByQuerySpy = jest
      .spyOn(airTable, 'getRecordByQuery')
      .mockImplementation(() => fakeProjectResource);
    const airTableHelperCreateRecordSpy = jest
      .spyOn(airTable, 'createRecord')
      .mockImplementation(() => true);
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
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledWith(fakeProjectsResourcesCacheTableName, {
      it_key: fakeRequest.query.it,
      res_id: fakeRequest.query.res,
    });
    expect(projectsHelperFormatProjectResourceFromAirTableSpy).toHaveBeenCalledTimes(1);

    expect(slackServicePostMessageSpy).toHaveBeenCalledTimes(1);

    expect(airTableHelperProjectsRegisterInterestCacheTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperCreateRecordSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperCreateRecordSpy).toHaveBeenCalledWith(fakeProjectsRegisterInterestTableName, {
      'Name': `${fakeRequest.body.firstName} ${fakeRequest.body.lastName}`,
      'Create date': dayjs().format('YYYY-MM-DD'),
      'Available from': fakeRequest.body.availableFrom,
      'Project name': fakeProjectResource.name,
      'Role': fakeProjectResource.role,
      'Peer Support': fakeRequest.body.lookingForPeerSupport ? 'Yes' : 'No',
      'email': fakeRequest.body.email,
    }, 'sta');

    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith({ data: 'success' });

    // Clean up
    airTableHelperProjectsResourcesCacheTableSpy.mockRestore();
    airTableHelperGetRecordByQuerySpy.mockRestore();
    airTableHelperCreateRecordSpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTableSpy.mockRestore();
    slackServicePostMessageSpy.mockRestore();
  });

  test('projectRegisterInterestHandler returns an error if project cannot be found', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = projectsTestData.fakeAirTableProjectResource(true);
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
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
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
    const fakeProjectResource = projectsTestData.fakeAirTableProjectResource(true);
    const fakeRequest = {
      query: {
        it: fakeProjectResource.it_key,
        res: fakeProjectResource.res_id,
      },
      body: {},
    };

    // Mock dependencies
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
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
    const fakeProjectResource = projectsTestData.fakeAirTableProjectResource(true);
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
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
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
