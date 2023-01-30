/**
 * @file Theme definition for NativeProvider
 * https://www.figma.com/file/RgxknLjxmS2CqBEDEZWPCU/STA-Volunteer-App---New-Designs
 */

import { extendTheme } from 'native-base'

const StaTheme = extendTheme({
  colors: {
    primary: {
      100: '#d1338A',
      80: '#d659a0',
      60: '#df88bb',
      40: '#eab7d6',
      20: '#f6e2ee',
    },
    secondary: {
      100: '#31729b',
      80: '#3583af',
      60: '#44a3cf',
      40: '#67bddb',
      20: '#b6e3f0',
    },
    text: {
      100: '#3c3c3b',
    },
    bg: {
      100: '#fbfbfb',
    },
    error: {
      100: '#e30613',
    },
    focus: {
      100: '#3c3c3b',
    },
    accentGreen: {
      100: '#1d781d',
    },
    accentOrange: {
      100: '#ec6730',
    },
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Medium',
        bold: 'Poppins-Bold',
      },
    },
  },
  fonts: {
    primary: 'Poppins',
  },
  components: {
    Text: {
      baseStyle: {
        color: '#3C3C3B',
        fontFamily: 'primary',
        padding: '2',
      },
    },
    Heading: {
      baseStyle: {
        color: '#D1338A',
        fontFamily: 'primary',
      },
    },
  },
})

export default StaTheme
