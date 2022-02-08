const request = require('supertest');
const app = require('../app');

describe('Test the projects api', () => {
  test('GET all method should respond successfully', async () => {
    const response = await request(app).get('/projects');
    expect(response.statusCode).toBe(200);
  }, 120000);

  test('GET single project by ID method should return Not Found', async () => {
    const response = await request(app).get('/projects/1');
    expect(response.statusCode).toBe(404);
  });
});
