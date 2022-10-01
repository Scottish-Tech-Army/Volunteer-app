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

export const { useLazyFetchAllQuery, useLazyRegisterInterestQuery } =
  projectsApi

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
}

export type Projects = Project[]

// Groups of related job roles
// These are used e.g. for searching projects
export const RolesRelated = [
  {
    roles: [
      'Business Analyst',
      'Business Change Analyst',
      'Business Systems Analyst',
      'Change Analyst',
      'Management Consultant',
      'Process Analyst',
      'Technical Analyst',
      'Senior Business Architect',
    ],
  },
  {
    roles: ['Data Analyst', 'Business Intelligence Analyst', 'MI Analyst'],
  },
  {
    roles: [
      'Data Engineer',
      'Data Scientist',
      'Data Modeller',
      'Data Developer',
      'Database Administrator',
    ],
  },
  {
    roles: [
      'Cyber Security Analyst',
      'Data Security Officer',
      'InfoSec Manager',
    ],
  },
  {
    roles: [
      'UI/UX designer',
      'UI designer',
      'UX designer',
      'Interaction Designer',
      'Visual Designer',
    ],
  },
  {
    roles: ['Mobile developer', 'Mobile Application Developer'],
  },
  {
    roles: [
      'PMO Analyst',
      'Project Co-ordinator',
      'Project Analyst',
      'PMO Lead',
    ],
  },
  {
    roles: [
      'BA/PM',
      'Business Analyst',
      'Product Manager',
      'Product Manager',
      'Product Owner',
      'Project Administrator',
    ],
  },
  {
    roles: [
      'Tech Help (IT Support)',
      'IT Support',
      '1st/2nd Line Support',
      'Support Technician',
    ],
  },
  {
    roles: [
      'Test Analyst',
      'Quality Analyst',
      'Quality Assurance Analyst',
      'QA Analyst',
    ],
  },
  {
    roles: ['Solutions Architect', 'IT architect', 'Design Architect'],
  },
  {
    roles: ['Digital trainer', 'Technology Trainer'],
  },
  {
    roles: ['Digital Consultant', 'Digital Transformation Consultant'],
  },
  {
    roles: [
      'Web developer',
      'Front End Developer',
      'Back End Developer',
      'Full Stack Developer',
    ],
  },
  {
    roles: ['Software engineer', 'DevOps Engineer'],
  },
  {
    roles: [
      'Communications manager',
      'Communications Director',
      'Public Relations Manager',
      'Social Media Manager',
      'Fundraising manager',
    ],
  },
  {
    roles: [
      'Copywriter',
      'Advertising Copywriter',
      'Communications Specialist',
    ],
  },
  {
    roles: ['Researcher', 'User Researcher', 'UX Researcher'],
  },
  {
    roles: [
      'Infrastructure Engineer/Cloud',
      'Infrastructure Engineer',
      'Cloud Engineer',
    ],
  },
  {
    roles: [
      'Marketing Manager',
      'Brand Manager',
      'Product Marketing Manager',
      'Marketing Executive',
      'Social Media Manager',
    ],
  },
]
