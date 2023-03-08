/**
 * @file Defines the Project type (and related types), and the lazy queries for fetching projects data from the API.
 */

import { api } from '../../api'
import fetchAll from './fetchAll'
import registerInterest from './registerInterest'

export interface Project {
  it_key: string
  res_id: string
  name: string
  type: string
  client: string
  role: string
  description: string
  skills: string[]
  hours: string
  required: string
  buddying: boolean
  sector: ProjectSector
  scope: string
  video_webpage?: string // URL of a page with the video player + also branding, text, other videos, etc, usually on Vimeo or YouTube -- of the three video fields this is most likely to be populated
  video_webpage_player_only?: string // URL of a page with only the video player - no branding, text, other videos, etc, usually on Vimeo or YouTube
}

export type Projects = Project[]

export enum ProjectSector {
  HealthSocialCare = 'Health & Social Care',
  EducationYouth = 'Education & Youth',
  ArtsCulture = 'Arts & Culture',
  Environment = 'Environment & Conservation',
  Community = 'Community Projects',
  Internal = 'Internal STA Project',
}

export enum ProjectsSearchField {
  Client = 'client',
  Description = 'description',
  Name = 'name',
  Role = 'role',
  Sector = 'sector',
  Skills = 'skills',
}

export enum ProjectTechnology {
  Java = 'Java',
  JavaScript = 'JavaScript',
  Python = 'Python',
  AWS = 'AWS',
  ReactNative = 'React Native',
  React = 'React',
}

export const projectsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAllProjects: fetchAll(build),
    projectRegisterInterest: registerInterest(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyFetchAllProjectsQuery,
  useLazyProjectRegisterInterestQuery,
} = projectsApi
