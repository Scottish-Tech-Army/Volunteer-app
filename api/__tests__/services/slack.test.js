import { faker } from '@faker-js/faker'
import axios from 'axios'
import dotenv from 'dotenv'
import logging from '../../services/logging'
import { convertChannelNameToWebHookEnvVariable, postMessage } from '../../services/slack'

describe('Test the Slack service', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('convertChannelNameToWebHookEnvVariable correctly reformats a string', () => {
    const envVariableName =
      convertChannelNameToWebHookEnvVariable('my-awesome-channel')

    expect(envVariableName).toEqual('SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL')
  })

  test('postMessage returns an error if .env variable has not been set', async () => {
    // Mock dependencies
    process.env = {}
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    // Run test
    const response = await postMessage(
      'my-awesome-channel',
      'My message',
    )

    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(response).toHaveProperty('error')

    // Clean up
    logErrorSpy.mockRestore()
  })

  test('postMessage correctly calls Slack webhook', async () => {
    // Set up fake test data
    const webhookUrl = faker.internet.url()
    const messageText = 'My message'

    // Mock dependencies
    process.env.SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL = webhookUrl
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})
    const axiosSpy = jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
      }),
    )

    // Run test
    const response = await postMessage(
      'my-awesome-channel',
      messageText,
    )

    expect(axiosSpy).toHaveBeenCalledTimes(1)
    expect(axiosSpy).toHaveBeenCalledWith(webhookUrl, { text: messageText })
    expect(response).toHaveProperty('data')

    // Clean up
    logErrorSpy.mockRestore()
    axiosSpy.mockRestore()
  })

  test('postMessage returns an error if does not receive 200 response from Slack', async () => {
    // Set up fake test data
    const webhookUrl = faker.internet.url()
    const statusText = 'Request error'

    // Mock dependencies
    process.env.SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL = webhookUrl
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})
    const axiosSpy = jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        statusText,
      }),
    )

    // Run test
    const response = await postMessage(
      'my-awesome-channel',
      'My message',
    )

    expect(axiosSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(response).toHaveProperty('error', statusText)

    // Clean up
    logErrorSpy.mockRestore()
    axiosSpy.mockRestore()
  })
})
