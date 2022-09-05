import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components/native'

const theme = {
  colors: {
    appBackground: '#E5E5E5',
    greyFaint: '#f2f2f2',
    staBlack: '#3c3c3b',
    staOrange: '#ec6730',
    staBlue: '#3192d0',
  },
}

const Theme: FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      appBackground: string
      greyFaint: string
      staBlack: string
      staOrange: string
      staBlue: string
    }
  }
}

export default Theme
