/**
 * @file Fetches all events data within a specified range
 */
import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Events } from '.'
import { EventsRange } from '.'
import { ApiBaseQueryFunctionType } from '@/Services/api'

export default (
  build: EndpointBuilder<ApiBaseQueryFunctionType, never, 'api'>,
  range: EventsRange,
) =>
  build.query<Events, string>({
    query: () =>
      `${Config.STA_BASE_URL}${Config.STA_API_VERSION}/events/schedule/${range}`,
    transformResponse: (data: Events) => data,
  })
