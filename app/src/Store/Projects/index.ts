/**
 * @file Set up the Redux store to allow us to share projects data across different app components.
 * setProjects is what's dispatched to actually store the projects
 */

import { createSlice } from '@reduxjs/toolkit'
import { Projects } from '@/Services/modules/projects'

const slice = createSlice({
  name: 'projects',
  initialState: [] as Projects,
  reducers: {
    setProjects: (state, { payload }: ProjectsPayload) => {
      if (typeof payload !== 'undefined') {
        state = payload
      }
    },
  },
})

export const { setProjects } = slice.actions

export default slice.reducer

type ProjectsPayload = {
  payload: Projects
}
