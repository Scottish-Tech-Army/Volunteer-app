import { act, render, renderHook, waitFor } from '@testing-library/react-native'
import React, { ReactNode } from 'react'
import { Text } from 'react-native'

import { AuthProvider, useAuth } from './AuthProvider'
import { AuthClient } from './authClient'

const wrapper =
  (client: any) =>
  ({ children }: { children: ReactNode }) =>
    <AuthProvider client={client}>{children}</AuthProvider>

describe('AuthProvider', () => {
  let mockAuthClient: jest.Mocked<
    Pick<AuthClient, 'authorize' | 'getIdToken' | 'logout' | 'getCurrentUser'>
  >

  beforeEach(() => {
    mockAuthClient = {
      authorize: jest.fn(),
      getIdToken: jest.fn().mockResolvedValue(undefined),
      getCurrentUser: jest.fn().mockResolvedValue(undefined),
      logout: jest.fn().mockResolvedValue(undefined),
    }
  })

  test('sets loading states during login', async () => {
    mockAuthClient.authorize.mockResolvedValueOnce({
      challenge: { username: 'foo@bar.com' },
    })
    mockAuthClient.authorize.mockResolvedValueOnce({
      tokens: { accessToken: 'foo@bar.com' },
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })

    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(false)
    })
    act(() => {
      result.current.login('foo@bar.com')
    })
    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.verifying).toBe(true)
    })

    mockAuthClient.getCurrentUser.mockResolvedValue({
      email: 'foo@bar.com',
      sub: '123',
    })

    act(() => {
      result.current.verifyLogin('answer')
    })
    expect(result.current.loading).toBe(true)

    expect(mockAuthClient.authorize).toHaveBeenCalledWith(
      {
        answer: 'answer',
        username: 'foo@bar.com',
      },
      'verify-challenge',
    )
    await waitFor(() => {
      expect(result.current.authenticated).toBe(true)
    })
    expect(result.current.user).toEqual({
      email: 'foo@bar.com',
      sub: '123',
    })
  })

  test('sets loading states during logout', async () => {
    mockAuthClient.getCurrentUser.mockResolvedValue({
      email: 'foo@bar.com',
      sub: '123',
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(true)
    })
    act(() => {
      result.current.logout()
    })
    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(false)
    })
  })

  test('handles errors during login', async () => {
    mockAuthClient.authorize.mockResolvedValueOnce({
      challenge: { username: 'foo@bar.com' },
    })
    mockAuthClient.authorize.mockResolvedValueOnce({
      statusCode: 401,
      message: 'NotAuthorizedException: Invalid session for the user.',
      error: 'Unauthorized',
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(false)
    })
    act(() => {
      result.current.login('foo@bar.com')
    })
    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.verifying).toBe(true)
    })

    act(() => {
      result.current.verifyLogin('answer')
    })
    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.error).toEqual(
        'NotAuthorizedException: Invalid session for the user.',
      )
    })
  })

  test('handles repeat challenges', async () => {
    mockAuthClient.authorize.mockResolvedValue({
      challenge: { username: 'foo@bar.com' },
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(false)
    })
    act(() => {
      result.current.login('foo@bar.com')
    })
    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.verifying).toBe(true)
    })

    act(() => {
      result.current.verifyLogin('answer')
    })

    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.verifying).toBe(true)
    })
  })

  test('handles tokens in first response', async () => {
    mockAuthClient.authorize.mockResolvedValue({
      tokens: { accessToken: 'foobar' },
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })
    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(false)
    })

    mockAuthClient.getCurrentUser.mockResolvedValue({
      email: 'foo@bar.com',
      sub: '123',
    })

    act(() => {
      result.current.login('foo@bar.com')
    })
    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.authenticated).toBe(true)
    })
  })

  test('initialises with authenticated state correctly', async () => {
    mockAuthClient.getIdToken.mockResolvedValue('id-token')
    mockAuthClient.getCurrentUser.mockResolvedValue({
      email: 'foo@bar.com',
      sub: '123',
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })

    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.authenticated).toBe(true)
    expect(result.current.user).toEqual({
      email: 'foo@bar.com',
      sub: '123',
    })
  })

  test('does not perform multiple authentication attempts', async () => {
    mockAuthClient.authorize.mockResolvedValue({
      tokens: { accessToken: 'foobar' },
    })
    mockAuthClient.getCurrentUser.mockResolvedValue({
      email: 'foo@bar.com',
      sub: '123',
    })
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapper(mockAuthClient),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => {
      result.current.login('email')
    })
    expect(result.current.loading).toBe(true)
    act(() => {
      result.current.login('email')
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.authenticated).toBe(true)

    expect(mockAuthClient.authorize).toHaveBeenCalledTimes(1)
  })

  describe('blockUntilInitialised', () => {
    test('only renders children after initialisation', async () => {
      mockAuthClient.getCurrentUser.mockResolvedValue(undefined)
      const blockingWrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider
          client={mockAuthClient as any}
          blockUntilInitialised={true}
        >
          {children}
        </AuthProvider>
      )
      const { queryByText } = render(<Text>Authentication test</Text>, {
        wrapper: blockingWrapper,
      })

      expect(queryByText('Authentication test')).toBeNull()
      await waitFor(() =>
        expect(queryByText('Authentication test')).toBeTruthy(),
      )
    })
  })
})
