import { api } from '../../api'
import fetchAll from './fetchAll'
import registerInterest from './registerInterest'

export const projectsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAll: fetchAll(build),
    registerInterest: registerInterest(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyFetchAllQuery,
  useLazyRegisterInterestQuery,
} = projectsApi

export interface Project {
  it_key: string
  res_id: string
  name: string
  type: string
  client: string
  role: string
  description: string
  video_webpage: string
  skills: string[]
  hours: string
  required: string
  buddying: boolean
  sector: string
  video_file: string
  scope: string
}

export type Projects = Project[]
