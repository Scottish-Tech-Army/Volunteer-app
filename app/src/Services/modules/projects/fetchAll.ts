import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Projects } from '.'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<Projects, string>({
    query: () => `${Config.STA_BASE_URL}/projects`,
    transformResponse: data => data?.projects,
  })
