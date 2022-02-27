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
  ResData: {
    res_id: string
    projectType: string
    jobRole: string
    description: string
    candidateCoreSkills: string
    candidateTime: string
    suitableForBuddy: boolean
  },
  ItData: {
    projectName: string
    charityName: string
    charityVideo: ImageURISource
  }
}

export type Projects = Project[]
