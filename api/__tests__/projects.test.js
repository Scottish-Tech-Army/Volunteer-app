const app = require('../app');
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const nock = require('nock');
const projects = require('../routes/projects');
const request = require('supertest');

axios.defaults.adapter = require('axios/lib/adapters/http');

// Set up fake data for tests

const fakeResBoardResults = [];
const fakeResBoardResultsTotal = faker.datatype.number(100);
const fakeItBoardResults = [];
const fakeItBoardResultsTotal = faker.datatype.number(1000);

const projectTypes = ['Charity', 'Design and Build', 'External Project', 'External STA Project', 'Internal'];
const suitableForBuddyOptions = ['Yes', 'none'];
const frequencyUnits = ['days', 'days a week', 'days total', 'hours', 'hours a week'];

for (let i = 0; i < fakeResBoardResultsTotal; i++) {
  fakeResBoardResults.push({
    jobRole: faker.name.jobTitle(),
    projectType: faker.random.arrayElement(projectTypes),
    suitableForBuddy: faker.random.arrayElement(suitableForBuddyOptions),
    candidateTime: `${faker.datatype.number({ min: 1, max: 4 })}-${faker.datatype.number({
      min: 5,
      max: 8,
    })} ${faker.random.arrayElement(frequencyUnits)}`,
    candidateCoreSkills: faker.lorem.sentence(),
  });
}

for (let j = 0; j < fakeItBoardResultsTotal; j++) {
  fakeItBoardResults.push({
    it_id: `${faker.datatype.number({ min: 15000, max: 15999 })}`,
    projectName: faker.lorem.sentence(),
    charityName: faker.company.companyName(),
    charityVideo: faker.random.arrayElement([faker.internet.url(), 'none']),
  });
}

// Set up mock

const allProjectsMock = nock('http://localhost:3000')
  .get('/projects')
  .reply(200, {
    jiraResBoard: {
      'number of results': fakeResBoardResultsTotal,
      data: fakeResBoardResults,
    },
    jiraItBoard: {
      'number of results': fakeItBoardResultsTotal,
      data: fakeItBoardResults,
    },
  });

// Run tests

describe('Test the projects api', () => {
  test('GET all method should respond successfully', async () => {
    const response = await axios.get('http://localhost:3000/projects');

    allProjectsMock.done();

    expect(response.status).toBe(200);

    expect(response.data.jiraResBoard['number of results']).toBe(fakeResBoardResultsTotal);
    expect(response.data.jiraResBoard.data.length).toBe(fakeResBoardResultsTotal);
    expect(response.data.jiraResBoard.data[0]).toEqual(fakeResBoardResults[0]);

    expect(response.data.jiraItBoard['number of results']).toBe(fakeItBoardResultsTotal);
    expect(response.data.jiraItBoard.data.length).toBe(fakeItBoardResultsTotal);
    expect(response.data.jiraItBoard.data[0]).toEqual(fakeItBoardResults[0]);
  });

  test('GET single project by ID method should return Not Found', async () => {
    const response = await request(app).get('/projects/1');
    expect(response.statusCode).toBe(404);
  });
});
