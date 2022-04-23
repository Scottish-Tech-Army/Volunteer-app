import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Projects } from '.'

interface ProjectRegisterInterestQuery {
  project: {
    it_key: String
    res_id: String
  }
  user: {
    firstName: String
    lastName: String
    email: String
    happyToMentor: String
    lookingForBuddy: String
    availableFrom: String
  }
}

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<{}>({
    query: (query: ProjectRegisterInterestQuery) => ({
      url: `${Config.STA_BASE_URL}/projects/single/register-interest?it=${query.project.it_key}&res=${query.project.res_id}`,
      method: 'POST',
      body: query.user,
    }),
    // transformResponse: data => data,
  })
