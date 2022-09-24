import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

interface ProjectRegisterInterestQuery {
  project: {
    res_id: string
  }
  user: {
    firstName: string
    lastName: string
    email: string
    happyToMentor: boolean
    lookingForBuddy: boolean
    availableFrom: string
  }
}

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<{ data?: string; error?: string }, ProjectRegisterInterestQuery>({
    query: (query: ProjectRegisterInterestQuery) => ({
      url: `${Config.STA_BASE_URL}/projects/${query.project.res_id}/register-interest`,
      method: 'POST',
      body: query.user,
    }),
    transformResponse: data => data,
  })
