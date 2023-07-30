import { faker } from '@faker-js/faker'
import axios from 'axios'
import dotenv from 'dotenv'
import { enableBugsnag } from '../../services/logging'

describe('Test the logging service', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('enableBugsnag returns false if in development environment', () => {
    // Mock dependencies
    process.env = {
      NODE_ENV: 'development',
    }
    const consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {})

    // Run test
    const result = enableBugsnag()

    // Check expectations are met
    expect(result).toEqual(false)

    // Clean up
    consoleErrorSpy.mockRestore()
  })

  test('enableBugsnag returns true if in production environment and API key set', () => {
    // Mock dependencies
    process.env = {
      BUGSNAG_API_KEY: faker.string.alphanumeric(20),
      NODE_ENV: 'production',
    }
    const consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {})

    // Run test
    const result = enableBugsnag()

    // Check expectations are met
    expect(result).toEqual(true)

    // Clean up
    consoleErrorSpy.mockRestore()
  })
})
