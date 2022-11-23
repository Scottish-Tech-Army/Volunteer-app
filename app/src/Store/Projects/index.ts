/**
 * @file Set up the Redux store to allow us to share projects data across different app components.
 * setProjects is what's dispatched to actually store the projects
 */

import { createSlice } from '@reduxjs/toolkit'
import { Projects } from '@/Services/modules/projects'

const slice = createSlice({
  name: 'projects',
  initialState: { projects: undefined } as ProjectsState,
  reducers: {
    setProjects: (state, { payload: { projects } }: ProjectsPayload) => {
      if (typeof projects !== 'undefined') {
        state.projects = projects
      }
    },
  },
})

export const { setProjects } = slice.actions

export default slice.reducer

export type ProjectsState = {
  projects: Projects | undefined
}

type ProjectsPayload = {
  payload: {
    projects?: Projects
  }
}
