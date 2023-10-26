/**
 * @file Fetches all projects data.
 */
import Constants from 'expo-constants'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Projects } from '.'
import { ApiBaseQueryFunctionType } from '@/Services/api'

/**
 * @function fetchAllProjects Fetches all projects
 * @param {EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>} build - endpoint builder from api created with RTK Query
 * @returns {void} no return.
 */
export default (
  build: EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>,
) =>
  build.query<Projects, string>({
    query: () => ({
      url: `${Constants.expoConfig?.extra?.api?.baseUrl ?? ''}/${
        Constants.expoConfig?.extra?.api?.version ?? ''
      }/projects`,
      method: 'GET',
      headers: {
        'x-api-key': `${Constants.expoConfig?.extra?.api?.apiKey ?? ''}`,
      },
    }),
    transformResponse: (data: Projects) => data,
  })
