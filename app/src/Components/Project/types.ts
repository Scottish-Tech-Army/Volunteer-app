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
