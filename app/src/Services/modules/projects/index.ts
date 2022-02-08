import { api } from '../../api'
import fetchAll from './fetchAll'

export const projectsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAll: fetchAll(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchAllQuery } = projectsApi

export interface Project {
  key: string
  name: string
  type: string
  client: string
  role: string
  description: string
  skills: string[]
  hours: string
  required: string
  buddying: boolean
}

export type Projects = Project[]