import { ImageURISource } from 'react-native'
import { api } from '../../api'
import fetchAll from './fetchAll'

export const projectsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAll: fetchAll(build),
  }),
  overrideExisting: true,
})

export const { useLazyFetchAllQuery } = projectsApi

export interface Project {
  it_key: string
  res_id: string
  name: string
  type: string
  client: string
  role: string
  description: string
  video: ImageURISource
  skills: string[]
  hours: string
  required: string
  buddying: boolean
}

export type Projects = Project[]
