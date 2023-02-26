import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

interface ProjectRegisterInterestQuery {
  project: {
    it_key: string
    res_id: string
  }
  user: {
    firstName: string
    lastName: string
    email: string
    lookingForPeerSupport: boolean
    availableFrom: string
  }
}

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<{ data?: string; error?: string }, ProjectRegisterInterestQuery>({
    query: (query: ProjectRegisterInterestQuery) => ({
      url: `${Config.STA_BASE_URL}/projects/single/register-interest?it=${query.project.it_key}&res=${query.project.res_id}`,
      method: 'POST',
      body: query.user,
    }),
    transformResponse: data => data,
  })
