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
  name: string
  client: string
  role: string
  description: string
  skills: string[]
  hours: number
  required: boolean
  buddying: boolean
}

export type Projects = Project[]
