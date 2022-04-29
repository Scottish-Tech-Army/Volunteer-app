const { faker } = require('@faker-js/faker');
const axios = require('axios');
const dotenv = require('dotenv');
const slackService = require('../../services/slack');

describe('Test the Slack service', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('convertChannelNameToWebHookEnvVariable correctly reformats a string', () => {
    const envVariableName = slackService.convertChannelNameToWebHookEnvVariable('my-awesome-channel');

    expect(envVariableName).toEqual('SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL');
  });

  test('postMessage returns an error if .env variable has not been set', async () => {
    // Mock dependencies
    process.env = {};
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    // Run test
    const response = await slackService.postMessage('my-awesome-channel', 'My message');

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('error');

    // Clean up
    consoleErrorSpy.mockRestore();
  });

  test('postMessage correctly calls Slack webhook', async () => {
    // Set up fake test data
    const webhookUrl = faker.internet.url();
    const messageText = 'My message';

    // Mock dependencies
    process.env.SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL = webhookUrl;
    const axiosSpy = jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve({
      status: 200,
    }));

    // Run test
    const response = await slackService.postMessage('my-awesome-channel', messageText);

    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith(webhookUrl, { text: messageText });
    expect(response).toHaveProperty('data');

    // Clean up
    axiosSpy.mockRestore();
  });

  test('postMessage returns an error if does not receive 200 response from Slack', async () => {
    // Set up fake test data
    const webhookUrl = faker.internet.url();
    const statusText = 'Request error';

    // Mock dependencies
    process.env.SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL = webhookUrl;
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    const axiosSpy = jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve({
      status: 400,
      statusText,
    }));

    // Run test
    const response = await slackService.postMessage('my-awesome-channel', 'My message');

    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('error', statusText);

    // Clean up
    consoleErrorSpy.mockRestore();
    axiosSpy.mockRestore();
  });
});
