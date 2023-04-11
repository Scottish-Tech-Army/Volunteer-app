/**
 * @file Set up the Redux store to allow us to share permissions settings across different app components.
 * setPermissions is what's dispatched to actually store the projects
 */

import { createSlice } from '@reduxjs/toolkit'

export interface DataPermissions {
  errorLogs: boolean // are we allowed to send error/crash logs to an external service
}

const slice = createSlice({
  name: 'permissions',
  initialState: { data: { errorLogs: false } } as PermissionsState,
  reducers: {
    setPermissions: (state, { payload: { data } }: PermissionsPayload) => {
      if (typeof data !== 'undefined') {
        state.data = data
      }
    },
  },
})

export const { setPermissions } = slice.actions

export default slice.reducer

export type PermissionsState = {
  data: DataPermissions
}

type PermissionsPayload = {
  payload: {
    data?: DataPermissions
  }
}
