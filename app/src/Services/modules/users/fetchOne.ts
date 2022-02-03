import { Config } from '@/Config'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { User } from '.'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<User, string>({
    query: id => `${Config.EXAMPLE_USER_URL}/users/${id}`,
  })
