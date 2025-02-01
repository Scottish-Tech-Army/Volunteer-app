/**
 * @file Fetches all events data within a specified range
 */

import Constants from 'expo-constants'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Events } from '.'
import { EventsRange } from '.'
import { ApiBaseQueryFunctionType } from '@/Services/api'

/**
 * @function fetchAllEvents Fetches all events
 * @param {EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>} build - endpoint builder from api created with RTK Query
 * @param {EventsRange} range - specifies whether past or upcoming events are required
 * @return {void} No return.
 */
export default (
  build: EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>,
  range: EventsRange,
) =>
  build.query<Events, string>({
    query: () => {
      if (!Constants.expoConfig?.extra?.api?.baseUrl) {
        throw new Error(`Missing variable in fetchAll events, "baseUrl"`)
      }
      const url = `${Constants.expoConfig.extra.api.baseUrl}/${Constants.expoConfig?.extra?.api?.version}/events/schedule/${range}`
      return {
        url,
        method: 'GET',
        headers: {
          'x-api-key': `${Constants.expoConfig?.extra?.api?.apiKey ?? ''}`,
        },
      }
    },
    transformResponse: (data: Events) => data,
  })
