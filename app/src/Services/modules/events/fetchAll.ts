import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Events } from '.'
import { EventsRange } from '.'

export default (build: EndpointBuilder<any, any, any>, range: EventsRange) =>
  build.query<Events, string>({
    query: () => `${Config.STA_BASE_URL}/events/schedule/${range}`,
    transformResponse: data => data,
  })
