/**
 * @file Set up the Redux store to allow us to share theme settings across different components
 *
 * TODO: remove 'theme' and 'darkMode' settings when we have fully switched to NativeBase
 */

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: null,
    darkMode: null,
    useSystemColourMode: true,
  } as ThemeState,
  reducers: {
    changeTheme: (
      state,
      { payload: { theme, darkMode, useSystemColourMode } }: ThemePayload,
    ) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode
      }
      if (typeof useSystemColourMode !== 'undefined') {
        state.useSystemColourMode = useSystemColourMode
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode, useSystemColourMode } }: ThemePayload,
    ) => {
      if (!state.theme) {
        state.theme = theme
        state.darkMode = darkMode
        state.useSystemColourMode = useSystemColourMode
      }
    },
  },
})

export const { changeTheme, setDefaultTheme } = slice.actions

export default slice.reducer

export type ThemeState = {
  theme: 'default' | null | undefined // old theme
  darkMode: boolean | null | undefined // old theme
  useSystemColourMode: boolean | undefined // for use with new NativeBase theme -- sets whether to use system default for dark mode or not
}

type ThemePayload = {
  payload: ThemeState
}
