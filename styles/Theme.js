import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    appBackground: "#E5E5E5",
    staBlack: "#3c3c3b",
    staOrange: "#ec6730",
    staBlue: "#3192d0"
  },
  fonts: ["Poppins", "Roboto"],
//   fontSizes: {
//     small: "1em",
//     medium: "2em",
//     large: "3em"
//   }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;

