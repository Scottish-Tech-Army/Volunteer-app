/**
 * @file Fetches all projects data.
 */
import { ApiBaseQueryFunctionType } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import Constants from 'expo-constants'
import { Projects } from '.'

/**
 * @function fetchAllProjects Fetches all projects
 * @param {EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>} build - endpoint builder from api created with RTK Query
 * @returns {void} no return.
 */
export default (
  build: EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>,
) =>
  build.query<Projects, string>({
    query: () => {
      if (!Constants.expoConfig?.extra?.api?.dynamoUrl) {
        throw new Error(`Missing variable in fetchAll projects, "dynamoUrl"`)
      }
      const url = `${Constants.expoConfig.extra.api.dynamoUrl}`
      return {
        /*url: `${Constants.expoConfig?.extra?.api?.baseUrl ?? ''}/${
        Constants.expoConfig?.extra?.api?.version ?? ''
      }/projects`,*/
        url,
        method: 'GET',
        headers: {
          'x-api-key': `${Constants.expoConfig?.extra?.api?.apiKey}`,
        },
      }
    },
    transformResponse: (data: Projects) => data,
  })
