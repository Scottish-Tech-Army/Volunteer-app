const request = require('supertest');
const airtable = require('../routes/airTable');
const app = require('../app')
var axios = require('axios');
const nock = require('nock')

axios.defaults.adapter = require('axios/lib/adapters/http')

const scope = nock('http://localhost:5000')
    .get('/airtable/events')
    .reply(200, [
      {
        "id": "recAb4kAFdkeKKnLU",
        "fields": {
          "Event Name": "Showcase - Volunteer app",
          "Event Status": "Past",
          "Event Date": "2021-09-08",
          "Event time": 43200,
          "Duration": 3600,
          "Event Description": "We are proud to showcase our volunteer projects. Come and have a look at the story so far, if you are curious & want to volunteer- join us!",
          "Event Type": "Internal",
          "Event link": "https://vimeo.com/583815096",
          "Event Series": "STA Project Showcase"
        },
        "createdTime": "2021-09-21T12:29:41.000Z"
      },{
        "id": "reczf1MnfITcs4G8N",
        "fields": {
          "Event Name": "Showcase - Foodbank Support",
          "Event Status": "Scheduled",
          "Event Date": "2021-10-20",
          "Event time": 50400,
          "Duration": 2700,
          "Event Description": "The team has been steadily working with the Trussell Trust to support the roll out of their volunteer app.\n",
          "Event Type": "Internal",
          "Event Series": "STA Project Showcase"
        },
        "createdTime": "2021-09-30T17:41:59.000Z"
      }])

describe("Test the projects api", () => {
  // jest.setTimeout(60000)
  
  test("GET all method should respond successfully", async () => {
 
    

    const response = await axios.get('http://localhost:5000/airtable/events')
 
    scope.done()
    expect(response.status).toBe(200)
    expect(response.data[0].id).toBe("recAb4kAFdkeKKnLU")
  });
  
  test("GET single project by ID method should return Not Found", async () => {
    // jest.setTimeout(60000)
    const response = await request(app).get("/airtable/events/1");
    expect(response.statusCode).toBe(404);
  });
});