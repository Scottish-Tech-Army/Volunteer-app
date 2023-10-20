import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import { AuthClient, AuthError, AuthorizeParams, AuthUser } from './authClient'

interface AuthenticationChallenge {
  username?: string
  session?: string
}

export interface AuthContext {
  authenticated: boolean
  user?: AuthUser
  loading: boolean
  verifying: boolean
  error?: string
  login: (email: string) => Promise<void>
  verifyLogin: (answer: string) => Promise<void>
  logout: () => Promise<void>
  getIdToken: () => Promise<string | undefined>
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)
export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('Auth context not found')
  }

  return authContext
}

type Action =
  | {
      type: 'LOGIN_STARTED' | 'VERIFICATION_STARTED' | 'LOGOUT'
    }
  | { type: 'CHALLENGE_RECEIVED'; challenge?: AuthenticationChallenge }
  | {
      type: 'INITIALISED' | 'AUTHENTICATION_COMPLETE'
      user?: AuthUser
    }
  | { type: 'ERROR'; error: AuthError | any }

interface AuthState {
  initialised: boolean
  authenticated: boolean
  loading: boolean
  verifying: boolean
  error?: string
  challengeParams?: AuthenticationChallenge
  user?: AuthUser
}

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_STARTED':
    case 'VERIFICATION_STARTED':
      return {
        ...state,
        loading: true,
        error: undefined,
      }
    case 'CHALLENGE_RECEIVED':
      return {
        ...state,
        loading: false,
        verifying: true,
        challengeParams: action.challenge,
      }
    case 'INITIALISED':
    case 'AUTHENTICATION_COMPLETE':
      return {
        ...state,
        initialised: true,
        loading: false,
        verifying: false,
        authenticated: !!action.user,
        user: action.user,
        error: undefined,
      }
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        verifying: false,
        authenticated: false,
        user: undefined,
        error: undefined,
      }
  }
}

export const AuthProvider: React.FC<{
  client: AuthClient
  blockUntilInitialised?: boolean
  children: React.ReactNode
}> = ({ client, blockUntilInitialised = false, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    authenticated: false,
    verifying: false,
    loading: true,
    initialised: false,
  })
  useEffect(() => {
    const checkAccessToken = async () => {
      const user = await client.getCurrentUser()
      dispatch({ type: 'INITIALISED', user })
    }

    checkAccessToken()
  }, [client])

  const authorize = useCallback(
    async (
      params: AuthorizeParams,
      method: 'login' | 'verify-challenge' | 'refresh',
    ) => {
      if (state.loading) {
        return
      }
      dispatch({ type: 'LOGIN_STARTED' })
      try {
        const response = await client.authorize(params, method)
        if ('error' in response) {
          dispatch({ type: 'ERROR', error: response })
        } else if ('challenge' in response) {
          dispatch({
            type: 'CHALLENGE_RECEIVED',
            challenge: response.challenge,
          })
        } else {
          const user = await client.getCurrentUser()
          dispatch({ type: 'AUTHENTICATION_COMPLETE', user })
        }
      } catch (error) {
        dispatch({ type: 'ERROR', error })
      }
    },
    [client, state.loading],
  )

  const login = useCallback(
    async (email: string) => {
      await authorize({ username: email }, 'login')
    },
    [authorize],
  )

  const verifyLogin = useCallback(
    async (answer: string) => {
      dispatch({ type: 'VERIFICATION_STARTED' })

      await authorize({ answer, ...state.challengeParams }, 'verify-challenge')
    },
    [authorize, state.challengeParams],
  )

  const logout = useCallback(async () => {
    dispatch({ type: 'LOGIN_STARTED' })
    await client.logout()
    dispatch({ type: 'LOGOUT' })
  }, [client])

  const getIdToken = useCallback(() => {
    return client.getIdToken()
  }, [client])

  const config = useMemo(
    () => ({
      ...state,
      login,
      verifyLogin,
      logout,
      getIdToken,
    }),
    [state, login, verifyLogin, logout, getIdToken],
  )

  return (
    <AuthContext.Provider value={config}>
      {blockUntilInitialised ? state.initialised && children : children}
    </AuthContext.Provider>
  )
}
