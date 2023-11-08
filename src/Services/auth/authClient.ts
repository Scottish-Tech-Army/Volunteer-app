/**
 * @file A client for authentication
 */

import jwtDecode from 'jwt-decode'
import type { JwtPayload } from 'jwt-decode'

import { SecureStorage, Storage } from './storage'

const DEFAULT_EXPIRY_ADJUSTMENT_SECONDS = 300
const DEFAULT_NETWORK_RETRY_COUNT = 3

const hasExpired = (expiresIn: number) => expiresIn < Date.now() / 1000
const willExpire = (
  expiresIn: number,
  minTTL: number = DEFAULT_EXPIRY_ADJUSTMENT_SECONDS,
) => expiresIn < Math.floor(Date.now() / 1000) + minTTL

export interface AuthenticationResult {
  challenge?: AuthenticationChallenge
  tokens?: AuthenticationTokens
}

interface AuthenticationChallenge {
  username?: string
  session?: string
}

interface AuthenticationTokens {
  accessToken?: string
  refreshToken?: string
  idToken?: string
}

export interface AuthorizeParams {
  username?: string
  refreshToken?: string
  session?: string
  answer?: string
}

export interface AuthError {
  error: string
  statusCode: number
  message: string
}

export interface AuthClientConfig {
  storage?: Storage
  baseUrl: string
  trace?: TraceFn
}

interface AuthJwtPayload extends JwtPayload {
  email?: string
}

export interface AuthUser {
  sub: string
  email: string
}

type TraceFn = (message: string, context?: string) => void
const noopTrace = () => {
  // no-op
}

export class AuthClient {
  private readonly storage: Storage
  private readonly baseUrl: string
  private refreshRequest?: Promise<string | undefined>
  private readonly trace: TraceFn

  constructor({ storage = SecureStorage, baseUrl, trace }: AuthClientConfig) {
    this.storage = storage
    this.baseUrl = baseUrl
    this.trace = trace || noopTrace
  }

  async getCurrentUser(): Promise<AuthUser | undefined> {
    const token = await this.getIdToken()

    if (!token) {
      this.trace('No ID token found', 'getCurrentUser')
      return undefined
    }

    const payload = jwtDecode<AuthJwtPayload>(token)

    if (!payload.email || !payload.sub) {
      throw new Error('ID token incomplete')
    }

    return {
      email: payload.email,
      sub: payload.sub,
    }
  }

  async getIdToken(): Promise<string | undefined> {
    if (this.refreshRequest) {
      this.trace('Refresh token request in progress', 'getIdToken')
      return this.refreshRequest
    }

    const token = await this.storage.getItem('id-token')

    if (!token) {
      this.trace('No ID token in storage', 'getIdToken')
      return undefined
    }

    const payload = jwtDecode<AuthJwtPayload>(token)

    if (payload.exp && (hasExpired(payload.exp) || willExpire(payload.exp))) {
      this.trace(`ID token has expired ${payload.exp}`, 'getIdToken')
      const refreshToken = await this.storage.getItem('refresh-token')
      if (refreshToken) {
        if (this.refreshRequest) {
          // thread safety, old skool
          // Not actuall sure if this can happen using `await`?
          this.trace(
            'Refresh token request in progress, at a point where it probably should not be',
            'getIdToken',
          )
          return this.refreshRequest
        }

        this.trace('Refreshing ID token', 'getIdToken')

        this.refreshRequest = this.authorize({ refreshToken }, 'refresh')
          .then(async response => {
            if ('tokens' in response && response.tokens?.idToken) {
              this.trace('ID token refreshed', 'getIdToken')
              return response.tokens.idToken
            }

            this.trace(
              `Refresh auth failed ${JSON.stringify(response)}`,
              'getIdToken',
            )

            // 4xx error should only happen if refresh token is invalid, so clear it and log the user out
            if (
              'statusCode' in response &&
              response.statusCode >= 400 &&
              response.statusCode < 500
            ) {
              this.trace('Clearing auth tokens', 'getIdToken')
              await this.clearTokens()
              return undefined
            }

            // Non-4xx error means this is likely a transient server issue, whilst this could result in
            // 401 API responses it at least does not log the user out
            return token
          })
          .catch(async (error: unknown) => {
            this.trace(
              `Refresh auth failed ${JSON.stringify(error)}`,
              'getIdToken',
            )
            // This would only throw in case of a network issue, leave the user logged in until network returns
            return token
          })
          .finally(() => {
            this.refreshRequest = undefined
          })
        return this.refreshRequest
      } else {
        this.trace('ID refresh token in storage', 'getIdToken')
      }
    }

    return token
  }

  async authorize(
    params: AuthorizeParams,
    method: 'login' | 'verify-challenge' | 'refresh',
  ): Promise<AuthenticationResult | AuthError> {
    let response: Response | undefined, fetchError: unknown

    this.trace(method, 'authorize')

    for (let i = 0; i < DEFAULT_NETWORK_RETRY_COUNT; i++) {
      try {
        response = await fetch(`${this.baseUrl}/auth/${method}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })
        fetchError = null
        break
      } catch (error: unknown) {
        fetchError = error
      }
    }

    if (fetchError) {
      throw fetchError
    }

    if (!response) {
      throw new Error('Unknown fetch error')
    }

    if (!response.ok) {
      this.trace(`Received ${response.status} response code from auth attempt`)
      const body = await response.text()
      try {
        return JSON.parse(body) as AuthError
      } catch {
        return {
          statusCode: response.status,
          error: 'Unknown',
          message: body,
        }
      }
    }

    const result = (await response.json()) as AuthenticationResult

    await this.setTokens(result)

    return result
  }

  async logout(): Promise<void> {
    await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: await this.storage.getItem('refresh-token'),
      }),
    })

    await this.clearTokens()
  }

  private async setTokens(
    result: AuthenticationResult | AuthError,
  ): Promise<void> {
    if ('tokens' in result) {
      if (result.tokens?.accessToken) {
        await this.storage.setItem('access-token', result.tokens.accessToken)
      }
      if (result.tokens?.idToken) {
        await this.storage.setItem('id-token', result.tokens.idToken)
      }
      if (result.tokens?.refreshToken) {
        await this.storage.setItem('refresh-token', result.tokens.refreshToken)
      }
    }
  }

  private async clearTokens(): Promise<void> {
    await this.storage.removeItem('access-token')
    await this.storage.removeItem('id-token')
    await this.storage.removeItem('refresh-token')
  }
}
