const airTable = require('../../helpers/airTable');
const app = require('../../app');
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const nock = require('nock');
const { projectRegisterInterestHandler } = require('../../routes/projects');
const projectsHelper = require('../../helpers/projects');
const { getProjectHandler } = require('../../routes/projects');
const projectsTestData = require('../../__test-data__/projects');
const request = require('supertest');
const slackService = require('../../services/slack');

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Test the projects api', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('GET all method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResources = projectsTestData.fakeProjectResourceObjects(
      faker.datatype.number({ min: 30, max: 50 }),
    );

    // Mock dependencies
    const requestMock = nock('http://localhost:3000').get('/projects').reply(200, fakeProjectResources);

    // Run test
    const response = await axios.get('http://localhost:3000/projects');
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakeProjectResources);
  });

  test('GET a single project method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResource = projectsTestData.fakeProjectResourceObject();

    // Mock dependencies
    const singleProjectMock = nock('http://localhost:3000')
      .get(`/projects/${fakeProjectResource.res_id}`)
      .reply(200, fakeProjectResource);

    // Run test
    const response = await axios.get(`http://localhost:3000/projects/${fakeProjectResource.res_id}`);
    singleProjectMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(fakeProjectResource);
  });

  test('getProjectHandler gets a single record from AirTable, formats data and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = projectsTestData.fakeProjectAirTableRecords(1)[0];
    const fakeRequest = {
      params: {
        res_id: fakeProjectResource.res_id,
      },
    };

    // Mock dependencies
    const airTableHelperProjectsTableSpy = jest
      .spyOn(airTable, 'projectsResourcesCacheTable')
      .mockImplementation(() => fakeTableName);
    const airTableHelperGetRecordByQuerySpy = jest
      .spyOn(airTable, 'getRecordByQuery')
      .mockImplementation(() => fakeProjectResource);
    const projectsHelperFormatProjectResourceFromAirTable = jest
      .spyOn(projectsHelper, 'formatProjectResourceFromAirTable')
      .mockImplementation((projectAirTableRecord) => projectAirTableRecord);
    const responseMock = {
      send: jest.fn(() => responseMock),
      status: jest.fn(() => responseMock),
    };

    // Run test
    await getProjectHandler(fakeRequest, responseMock);

    // Check test expectations are met
    expect(airTableHelperProjectsTableSpy).toHaveBeenCalledTimes(1);
    expect(airTableHelperGetRecordByQuerySpy).toHaveBeenCalledTimes(1);
    expect(projectsHelperFormatProjectResourceFromAirTable).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
    expect(responseMock.send).toHaveBeenCalledWith(fakeProjectResource);

    // Clean up
    airTableHelperProjectsTableSpy.mockRestore();
    airTableHelperGetRecordByQuerySpy.mockRestore();
    projectsHelperFormatProjectResourceFromAirTable.mockRestore();
  });

  test('POST register interest in a single project method should respond successfully', async () => {
    // Set up fake test data
    const fakeProjectResource = projectsTestData.fakeProjectResourceObject();
    const postData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
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
      .post(`/projects/${fakeProjectResource.res_id}/register-interest`)
      .reply(200, responseData);

    // Run test
    const response = await axios.post(
      `http://localhost:3000/projects/${fakeProjectResource.res_id}/register-interest`,
      postData,
    );
    requestMock.done();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test('projectRegisterInterestHandler calls AirTable and Slack and returns a response', async () => {
    // Set up fake test data
    const fakeTableName = faker.lorem.word();
    const fakeProjectResource = projectsTestData.fakeAirTableProjectResource(true);
    const fakeRequest = {
      params: {
        res_id: fakeProjectResource.res_id,
      },
      body: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        happyToMentor: faker.datatype.boolean(),
        lookingForBuddy: faker.datatype.boolean(),
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
      res_id: fakeRequest.params.res_id,
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
    const fakeProjectResource = projectsTestData.fakeAirTableProjectResource(true);
    const fakeRequest = {
      params: {
        res_id: fakeProjectResource.res_id,
      },
      body: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        happyToMentor: faker.datatype.boolean(),
        lookingForBuddy: faker.datatype.boolean(),
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
      res_id: fakeRequest.params.res_id,
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
      params: {
        res_id: fakeProjectResource.res_id,
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
      res_id: fakeRequest.params.res_id,
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
      params: {
        res_id: fakeProjectResource.res_id,
      },
      body: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        happyToMentor: faker.datatype.boolean(),
        lookingForBuddy: faker.datatype.boolean(),
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
      res_id: fakeRequest.params.res_id,
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
