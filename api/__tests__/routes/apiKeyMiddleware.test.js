const axios = require('axios');
const eventsHelper = require('../../helpers/events');
const { apiKeyMiddleware } = require('../../routes/apiKeyMiddleware');
axios.defaults.adapter = require('axios/lib/adapters/http');

const API_KEY = process.env.API_KEY;


describe('Test API key Authentication', () => {
    test('Should pass to next when expected API key is passed', async () => {

        const fakeRequest = {
            header: jest.fn((key) => API_KEY),
        };

          const responseMock = {
            send: jest.fn(() => responseMock),
            status: jest.fn(() => responseMock),
          };

          const mockedNext = jest.fn();
        
        //  getEventHandler
          // Run test
        await apiKeyMiddleware(fakeRequest, responseMock, mockedNext);

        expect(mockedNext.mock.calls.length).toBe(1);


    });

    test('Should throw unauthorised when passes incorrect key', async () => {

        const fakeRequest = {
            header: jest.fn((key) => 'invalid-test-api-key'),
        };

          const responseMock = {
            send: jest.fn(() => responseMock),
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock),
          };

          const mockedNext = jest.fn();
        
        //  getEventHandler
          // Run test
        await apiKeyMiddleware(fakeRequest, responseMock, mockedNext);

        expect(responseMock.status).toHaveBeenCalledTimes(1);
        expect(responseMock.status).toHaveBeenCalledWith(401);
        expect(responseMock.json).toHaveBeenCalledTimes(1);
        expect(responseMock.json).toHaveBeenCalledWith({ message: "Unauthorized" });


    })
});
