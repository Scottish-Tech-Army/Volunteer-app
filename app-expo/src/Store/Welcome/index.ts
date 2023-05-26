/**
 * @file Store for welcome screen setting in Example Container.
 */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'welcome',
  initialState: {
    welcome: null,
    show: true,
  } as WelcomeState,
  reducers: {
    changeWelcome: (state, { payload: { welcome, show } }: WelcomePayload) => {
      if (typeof welcome !== 'undefined') {
        state.welcome = welcome
      }
      if (typeof show !== 'undefined') {
        state.show = show
      }
    },
    setDefaultWelcome: (
      state,
      { payload: { welcome, show } }: WelcomePayload,
    ) => {
      if (!state.welcome) {
        state.welcome = welcome
        state.show = show
      }
    },
  },
})

export const { changeWelcome, setDefaultWelcome } = slice.actions

export default slice.reducer

export type WelcomeState = {
  welcome: 'default' | null | undefined
  show: boolean | undefined
}

type WelcomePayload = {
  payload: {
    welcome: 'default' | null | undefined
    show: boolean | undefined
  }
}
