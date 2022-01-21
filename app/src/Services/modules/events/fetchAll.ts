import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Events } from '.'


export default (build: EndpointBuilder<any, any, any>) =>
  build.query<Events, string>({
    query: () => `${Config.STA_BASE_URL}/airtable/events`,
    transformResponse: data => data,
  })
