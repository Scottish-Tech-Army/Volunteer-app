import jwt from 'jsonwebtoken'
import nock from 'nock'
import { NativeModules } from 'react-native'

import { InMemoryStorage, Storage } from './storage'
import { AuthClient } from './authClient'

const oneHourInSeconds = 60 * 60
const justUnderFiveMinutesInSeconds = 299

const mockGetUserContextData = jest.fn().mockResolvedValue(undefined)
NativeModules.AuthModule = {
  getUserContextData: mockGetUserContextData,
}

describe('AuthClient', () => {
  let authClient: AuthClient
  let mockStorage: Storage

  beforeEach(() => {
    mockStorage = new InMemoryStorage()
    authClient = new AuthClient({
      storage: mockStorage,
      domain: 'http://testing.com',
    })
  })

  afterEach(() => {
    nock.cleanAll()
    jest.resetAllMocks()
  })

  describe('#authorize', () => {
    test('retries on network error and eventually returns result', async () => {
      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .twice()
        .replyWithError({ code: 'ETIMEDOUT' })
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(200, {
          tokens: {
            accessToken: 'new-access-token',
            idToken: 'new-id-token',
          },
        })

      const result = await authClient.authorize(
        { refreshToken: 'stored-refresh-token' },
        'refresh',
      )

      expect(result).toEqual({
        tokens: {
          accessToken: 'new-access-token',
          idToken: 'new-id-token',
        },
      })
    })

    test('returns auth error response', async () => {
      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(401, {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid credentials',
        })

      const result = await authClient.authorize(
        { refreshToken: 'stored-refresh-token' },
        'refresh',
      )

      expect(result).toEqual({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid credentials',
      })
    })

    test('returns generic error response', async () => {
      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(500, 'some transient server error')

      const result = await authClient.authorize(
        { refreshToken: 'stored-refresh-token' },
        'refresh',
      )

      expect(result).toEqual({
        statusCode: 500,
        error: 'Unknown',
        message: 'some transient server error',
      })
    })

    test('stores token on successful auth', async () => {
      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(200, {
          tokens: {
            accessToken: 'access-token-test',
            refreshToken: 'refresh-token-test',
            idToken: 'id-token-test',
          },
        })

      const result = await authClient.authorize(
        { refreshToken: 'stored-refresh-token' },
        'refresh',
      )

      expect(result).toEqual({
        tokens: {
          accessToken: 'access-token-test',
          refreshToken: 'refresh-token-test',
          idToken: 'id-token-test',
        },
      })

      expect(await mockStorage.getItem('access-token')).toEqual(
        'access-token-test',
      )
      expect(await mockStorage.getItem('refresh-token')).toEqual(
        'refresh-token-test',
      )
      expect(await mockStorage.getItem('id-token')).toEqual('id-token-test')
    })

    test('does not overwrite refresh token if not in response', async () => {
      nock('http://testing.com')
        .post('/auth/refresh', { refreshToken: 'existing-refresh-token' })
        .reply(200, {
          tokens: {
            accessToken: 'access-token-test',
            idToken: 'id-token-test',
          },
        })

      mockStorage.setItem('refresh-token', 'existing-refresh-token')

      const result = await authClient.authorize(
        { refreshToken: 'existing-refresh-token' },
        'refresh',
      )

      expect(result).toEqual({
        tokens: {
          accessToken: 'access-token-test',
          idToken: 'id-token-test',
        },
      })

      expect(await mockStorage.getItem('access-token')).toEqual(
        'access-token-test',
      )
      expect(await mockStorage.getItem('refresh-token')).toEqual(
        'existing-refresh-token',
      )
      expect(await mockStorage.getItem('id-token')).toEqual('id-token-test')
    })

    test('given auth challenge response, returns response', async () => {
      nock('http://testing.com')
        .post('/auth/login', {
          username: 'foo@bar.com',
        })
        .reply(200, {
          challenge: {
            username: 'test-username',
            session: 'test-session',
          },
        })

      mockStorage.setItem('access-token', 'existing-access-token')
      mockStorage.setItem('id-token', 'existing-id-token')
      mockStorage.setItem('refresh-token', 'existing-refresh-token')

      const result = await authClient.authorize(
        {
          username: 'foo@bar.com',
        },
        'login',
      )

      expect(result).toEqual({
        challenge: {
          username: 'test-username',
          session: 'test-session',
        },
      })

      expect(await mockStorage.getItem('access-token')).toEqual(
        'existing-access-token',
      )
      expect(await mockStorage.getItem('refresh-token')).toEqual(
        'existing-refresh-token',
      )
      expect(await mockStorage.getItem('id-token')).toEqual('existing-id-token')
    })

    test('returns on error response', async () => {
      nock('http://testing.com')
        .post('/auth/login', {
          username: 'foo@bar.com',
        })
        .reply(401, {
          statusCode: 401,
        })

      const result = await authClient.authorize(
        {
          username: 'foo@bar.com',
        },
        'login',
      )

      expect(result).toEqual({
        statusCode: 401,
      })
    })
  })

  describe('#getIdToken', () => {
    test('given valid token in storage, returns it', async () => {
      const token = jwt.sign({}, 'supersecret', { expiresIn: oneHourInSeconds })
      mockStorage.setItem('id-token', token)
      mockStorage.setItem('refresh-token', 'refresh-token')

      const result = await authClient.getIdToken()

      expect(result).toEqual(token)
    })

    test('given expired token, attempts refresh token auth', async () => {
      const token = jwt.sign({}, 'supersecret', { expiresIn: -60 })
      mockStorage.setItem('id-token', token)
      mockStorage.setItem('refresh-token', 'stored-refresh-token')

      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(200, {
          tokens: {
            accessToken: 'new-access-token',
            idToken: 'new-id-token',
          },
        })

      const result = await authClient.getIdToken()

      expect(result).toEqual('new-id-token')
    })

    test('given token expiring soon, attempts refresh token auth', async () => {
      const token = jwt.sign({}, 'supersecret', {
        expiresIn: justUnderFiveMinutesInSeconds,
      })
      mockStorage.setItem('id-token', token)
      mockStorage.setItem('refresh-token', 'stored-refresh-token')

      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(200, {
          tokens: {
            accessToken: 'new-access-token',
            idToken: 'new-id-token',
          },
        })

      const result = await authClient.getIdToken()

      expect(result).toEqual('new-id-token')
    })

    test('only performs one refresh token auth at a time', async () => {
      const token = jwt.sign({}, 'supersecret', { expiresIn: -60 })
      mockStorage.setItem('id-token', token)
      mockStorage.setItem('refresh-token', 'stored-refresh-token')

      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(200, {
          tokens: {
            accessToken: 'new-access-token',
            idToken: 'new-id-token',
          },
        })
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .optionally()
        .reply(200, {
          tokens: {
            accessToken: 'second-access-token',
            idToken: 'second-id-token',
          },
        })

      const result = authClient.getIdToken()
      const result2 = authClient.getIdToken()

      await expect(result).resolves.toEqual('new-id-token')
      await expect(result2).resolves.toEqual('new-id-token')
    })

    test.each([400, 401])(
      'given %d error, clears all tokens',
      async statusCode => {
        const token = jwt.sign({}, 'supersecret', { expiresIn: -60 })
        mockStorage.setItem('id-token', token)
        mockStorage.setItem('refresh-token', 'stored-refresh-token')

        const scope = nock('http://testing.com')
          .post('/auth/refresh', {
            refreshToken: 'stored-refresh-token',
          })
          .reply(statusCode, {
            error: 'error',
            statusCode,
            message: 'some client error',
          })

        const result = await authClient.getIdToken()

        expect(result).toBe(undefined)
        expect(await mockStorage.getItem('access-token')).toBe(null)
        expect(await mockStorage.getItem('refresh-token')).toBe(null)
        expect(await mockStorage.getItem('id-token')).toBe(null)

        scope.done()
      },
    )

    test.each([500, 502, 503, 504])(
      'given %d error, returns expired token',
      async statusCode => {
        const token = jwt.sign({}, 'supersecret', { expiresIn: -60 })
        mockStorage.setItem('id-token', token)
        mockStorage.setItem('refresh-token', 'stored-refresh-token')

        const scope = nock('http://testing.com')
          .post('/auth/refresh', {
            refreshToken: 'stored-refresh-token',
          })
          .reply(statusCode, 'some transient server error')

        const result = await authClient.getIdToken()

        expect(result).toBe(token)
        expect(await mockStorage.getItem('refresh-token')).toBe(
          'stored-refresh-token',
        )
        expect(await mockStorage.getItem('id-token')).toBe(token)

        scope.done()
      },
    )

    test('returns expired token after too many retries', async () => {
      const token = jwt.sign({}, 'supersecret', { expiresIn: -60 })
      mockStorage.setItem('id-token', token)
      mockStorage.setItem('refresh-token', 'stored-refresh-token')

      const scope = nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .thrice()
        .replyWithError({ code: 'ETIMEDOUT' })

      const result = await authClient.getIdToken()

      expect(result).toBe(token)
      expect(await mockStorage.getItem('refresh-token')).toBe(
        'stored-refresh-token',
      )
      expect(await mockStorage.getItem('id-token')).toBe(token)

      scope.done()
    })
  })

  describe('#logout', () => {
    test('clears tokens after logout', async () => {
      mockStorage.setItem('access-token', 'existing-access-token')
      mockStorage.setItem('id-token', 'existing-id-token')
      mockStorage.setItem('refresh-token', 'existing-refresh-token')

      nock('http://testing.com')
        .post('/auth/logout', {
          refreshToken: 'existing-refresh-token',
        })
        .reply(204)

      await authClient.logout()

      expect(await mockStorage.getItem('access-token')).toBe(null)
      expect(await mockStorage.getItem('refresh-token')).toBe(null)
      expect(await mockStorage.getItem('id-token')).toBe(null)
    })
  })

  describe('#getCurrentUser', () => {
    test('returns user from id token', async () => {
      const token = jwt.sign(
        {
          sub: '123-123',
          email: 'test@user.com',
        },
        'supersecret',
        { expiresIn: oneHourInSeconds },
      )
      mockStorage.setItem('id-token', token)
      const result = await authClient.getCurrentUser()

      expect(result).toEqual({
        email: 'test@user.com',
        sub: '123-123',
      })
    })

    test('given expired token, attempts refresh token auth', async () => {
      const token = jwt.sign({}, 'supersecret', { expiresIn: -60 })
      mockStorage.setItem('id-token', token)
      mockStorage.setItem('refresh-token', 'stored-refresh-token')

      nock('http://testing.com')
        .post('/auth/refresh', {
          refreshToken: 'stored-refresh-token',
        })
        .reply(200, {
          tokens: {
            accessToken: 'new-access-token',
            idToken: jwt.sign(
              {
                sub: '123-123',
                email: 'test@user.com',
              },
              'supersecret',
              { expiresIn: oneHourInSeconds },
            ),
          },
        })

      const result = await authClient.getCurrentUser()

      expect(result).toEqual({
        email: 'test@user.com',
        sub: '123-123',
      })
    })

    test('returns undefined if no id token stored', async () => {
      const result = await authClient.getCurrentUser()

      expect(result).toBeUndefined()
    })

    test('throws error if id token is incomplete', async () => {
      const token = jwt.sign({}, 'supersecret', { expiresIn: oneHourInSeconds })
      mockStorage.setItem('id-token', token)

      const result = authClient.getCurrentUser()

      await expect(result).rejects.toThrow()
    })
  })
})
