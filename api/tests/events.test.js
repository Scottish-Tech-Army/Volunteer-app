const request = require('supertest');
const app = require('../app');

describe("Test the projects api", () => {
  jest.setTimeout(60000)
  test("GET all method should respond successfully", async () => {
    const response = await request(app).get("/airtable/events");
    expect(response.statusCode).toBe(200);
  });
  
  test("GET single project by ID method should return Not Found", async () => {
    jest.setTimeout(60000)
    const response = await request(app).get("/airtable/events/1");
    expect(response.statusCode).toBe(404);
  });
});