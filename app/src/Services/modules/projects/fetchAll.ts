/**
 * @file Fetches all projects data.
 */
import { Config } from '@/Config'
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
    query: () => `${Config.STA_BASE_URL}${Config.STA_API_VERSION}/projects`,
    transformResponse: (data: Projects) => data,
  })
