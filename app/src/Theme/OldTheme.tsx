import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components/native'
// import {
//   useFonts,
//   Poppins_400Regular,
//   Poppins_600Semi_Bold
// } from "@expo-google-fonts/poppins"

const theme = {
  colors: {
    appBackground: '#E5E5E5',
    staBlack: '#3c3c3b',
    staOrange: '#ec6730',
    staBlue: '#3192d0',
  },
  // fonts: Poppins_400Regular,
  // fontHeader: "Bebas Neue"
  //   fontSizes: {
  //     small: "1em",
  //     medium: "2em",
  //     large: "3em"
  //   }
}

const Theme: FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      appBackground: string
      staBlack: string
      staOrange: string
      staBlue: string
    }
  }
}

export default Theme
