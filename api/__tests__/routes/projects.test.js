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

  // set up data for single project

  const singleProjectsMock = nock('http://localhost:3000')
    .get('/projects/single?res=15486&it=IT-347')
    .reply(200, {
      res_id: '15486',
      it_related_field_id: 'IT-347',
      jobRole: 'Web Developer',
      projectType: 'Design and Build',
      suitableForBuddy: 'Yes',
      candidateTime: '10 Days',
      candidateCoreSkills: {
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Web Database Design and Build, ',
              },
            ],
          },
        ],
        type: 'doc',
        version: 1,
      },
      it_key: 'IT-347',
      projectSummary: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I have got an idea that would help unpaid carers to find professional help with their caring situation. It needs a bit of tech-ing though.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Julie.',
            },
          ],
        },
      ],
      projectName: 'Carers of East Lothian Website Help',
      charityName: 'Carers of East Lothian',
      charityVideo: 'none',
    });

  // Run tests

  describe('Test the projects api', () => {
    test('GET a single project method should respond successfully', async () => {
      const response = await axios.get('http://localhost:3000/projects/single?res=15486&it=IT-347');

      singleProjectsMock.done();

      expect(response.status).toBe(200);

      expect(response.data.res_id).toBe('15486');
      expect(response.data.it_key).toBe('IT-347');
    });
  });
});
