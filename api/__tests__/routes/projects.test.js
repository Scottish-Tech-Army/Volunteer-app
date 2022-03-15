const app = require('../../app');
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const nock = require('nock');
const projectsTestData = require('../../__test-data__/projects');
const request = require('supertest');

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

  test('GET single project by ID method should return Not Found', async () => {
    const response = await request(app).get('/projects/1');
    expect(response.statusCode).toBe(404);
  });

  describe('Test the projects api', () => {
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
  });
});
