const request = require('supertest');
const app = require('../app')
var axios = require('axios');
const nock = require('nock')

axios.defaults.adapter = require('axios/lib/adapters/http')

const scopeEvents = nock('http://localhost:3000')
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
          "Event Date": "2021-10-23",
          "Event time": 50400,
          "Duration": 2700,
          "Event Description": "The team has been steadily working with the Trussell Trust to support the roll out of their volunteer app.\n",
          "Event Type": "Internal",
          "Event Series": "STA Project Showcase"
        },
        "createdTime": "2021-09-30T17:41:59.000Z"
      }])

      const scopeSingleEvent = nock('http://localhost:3000')
      .get('/airtable/event/recAb4kAFdkeKKnLU')
      .reply(200, 
        {
          "id": "recAb4kAFdkeKKnLU",
          "fields": {
            "Event Name": "Showcase - Volunteer app",
            "Attachments": [
              {
                "id": "attBLi1thvJY4WPgh",
                "width": 800,
                "height": 600,
                "url": "https://dl.airtable.com/.attachments/57e0272e8d7b5aaa37e3f7a59f2326d8/d1264d9e/image1.jpg",
                "filename": "profile.jpg",
                "size": 311694,
                "type": "image/jpeg",
                "thumbnails": {
                  "small": {
                    "url": "https://dl.airtable.com/.attachmentThumbnails/fe49dfcb6a184c11f6882dd22f43f02d/207e51bb",
                    "width": 48,
                    "height": 36
                  },
                  "large": {
                    "url": "https://dl.airtable.com/.attachmentThumbnails/e3a7913515161c83b210a4fec03bc7fa/5bd0c145",
                    "width": 683,
                    "height": 512
                  },
                  "full": {
                    "url": "https://dl.airtable.com/.attachmentThumbnails/950e29521098d877ede948702c021c48/3dc57685",
                    "width": 3000,
                    "height": 3000
                  }
                }
              }
            ],
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
        })

        const pastEvents = nock('http://localhost:3000')
    .get('/airtable/events/schedule/past')
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
      }])

      const scheduledEvents = nock('http://localhost:3000')
    .get('/airtable/events/schedule/scheduled')
    .reply(200, [
      {
        "id": "reczf1MnfITcs4G8N",
        "fields": {
          "Event Name": "Showcase - Foodbank Support",
          "Event Status": "Scheduled",
          "Event Date": "2021-10-23",
          "Event time": 50400,
          "Duration": 2700,
          "Event Description": "The team has been steadily working with the Trussell Trust to support the roll out of their volunteer app.\n",
          "Event Type": "Internal",
          "Event Series": "STA Project Showcase"
        },
        "createdTime": "2021-09-30T17:41:59.000Z"
      }])



describe("Test the events api", () => {
  // jest.setTimeout(60000)
  
  test("GET all method should respond successfully", async () => {
 
    

    const response = await axios.get('http://localhost:3000/airtable/events')
 
    scopeEvents.done()
    expect(response.status).toBe(200)
    expect(response.data[0].id).toBe("recAb4kAFdkeKKnLU")
  });

  test("GET single event", async () => {
 
    

    const response = await axios.get('http://localhost:3000/airtable/event/recAb4kAFdkeKKnLU')
 
    scopeSingleEvent.done()
    expect(response.status).toBe(200)
    expect(response.data.id).toBe("recAb4kAFdkeKKnLU")
  });
  
  test("GET single project by ID method should return Not Found", async () => {
    const response = await request(app).get("/airtable/events/1");
    expect(response.statusCode).toBe(404);
  });

  test("GET past events should respond successfully", async () => {
 
    

    const response = await axios.get('http://localhost:3000/airtable/events/schedule/past')
    pastEvents.done()
    expect(response.status).toBe(200)
    expect(response.data[0].id).toBe("recAb4kAFdkeKKnLU")
  });

  test("GET scheduled events should respond successfully", async () => {
 
    

    const response = await axios.get('http://localhost:3000/airtable/events/schedule/scheduled')
 
    scheduledEvents.done()
    expect(response.status).toBe(200)
    expect(response.data[0].id).toBe("reczf1MnfITcs4G8N")
  });


});