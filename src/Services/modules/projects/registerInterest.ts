/**
 * @file defined the project, user and query for a user to register interest in a project.  Called in ProjectRegisterInterest.tsx
 */

import Constants from 'expo-constants'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { ApiBaseQueryFunctionType } from '@/Services/api'
interface ProjectRegisterInterestQuery {
  project_id: string
  res_id: string
  volunteer: {
    availableFrom: string
    email: string
    firstName: string
    lastName: string
    lookingForPeerSupport: boolean
  }
}

export type RegisterInterestResponseType = { data?: string; error?: string }

/**
 * @function registerInterest posts new case of registered interest
 * @param {EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>} build - endpoint builder from api created with RTK Query
 * @returns {void} no return.
 */
export default (
  build: EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>,
) =>
  build.query<{ data?: string; error?: string }, ProjectRegisterInterestQuery>({
    query: (query: ProjectRegisterInterestQuery) => {
      if (!Constants.expoConfig?.extra?.api?.dynamoUrl) {
        throw new Error(`Missing variable in registerInterest, "dynamoUrl"`)
      }

      const url = `${Constants.expoConfig?.extra?.api?.dynamoUrl}`
      return {
        url,
        method: 'POST',
        headers: {
          'x-api-key': `${Constants.expoConfig?.extra?.api?.apiKey}`,
        },
        body: query,
      }
    },
    transformResponse: (data: RegisterInterestResponseType) => {
      return data
    },
  })
