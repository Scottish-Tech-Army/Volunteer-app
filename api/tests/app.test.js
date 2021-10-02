const request = require('supertest');
const app = require('../app');

describe("Test the projects api", () => {
  test("GET method should respond successfully", async () => {
    const response = await request(app).get("/projects");
    expect(response.statusCode).toBe(200);
  });
});