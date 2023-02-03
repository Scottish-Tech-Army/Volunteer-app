/**
 * @file Theme definition for NativeProvider
 * https://www.figma.com/file/RgxknLjxmS2CqBEDEZWPCU/STA-Volunteer-App---New-Designs
 */

import { extendTheme } from 'native-base'

// Common values that are repeated should go here
const common = {
  colours: {
    pink100: '#d1338A',
    darkGrey100: '#3c3c3b',
    offWhite100: '#fbfbfb',
  },
  icons: {
    size: 8,
  },
}

const StaTheme = extendTheme({
  colors: {
    primary: {
      100: common.colours.pink100,
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
      100: common.colours.darkGrey100,
    },
    textDark: {
      100: common.colours.offWhite100,
    },
    bg: {
      100: common.colours.offWhite100,
    },
    bgDark: {
      100: common.colours.darkGrey100,
    },
    error: {
      100: '#e30613',
    },
    focus: {
      100: common.colours.darkGrey100,
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
        normal: 'Poppins-Thin',
        italic: 'Poppins-ThinItalic',
      },
      200: {
        normal: 'Poppins-ExtraLight',
        italic: 'Poppins-ExtraLightItalic',
      },
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },
      600: {
        normal: 'Poppins-SemiBold',
        italic: 'Poppins-SemiBoldItalic',
      },
      700: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
      800: {
        normal: 'Poppins-ExtraBold',
        italic: 'Poppins-ExtraBoldItalic',
      },
      900: {
        normal: 'Poppins-Black',
        italic: 'Poppins-BlackItalic',
      },
    },
  },

  fonts: {
    primary: 'Poppins',
  },

  components: {
    Heading: {
      baseStyle: {
        color: common.colours.darkGrey100,
        _dark: {
          color: common.colours.offWhite100,
        },
        fontFamily: 'primary',
        fontWeight: '600',
      },
    },

    Icon: {
      baseStyle: () => ({
        color: 'black',
        _dark: {
          color: 'white',
        },
      }),
      defaultProps: {
        size: common.icons.size,
      },
    },

    IconButton: {
      defaultProps: {
        size: common.icons.size,
      },
      sizes: {
        sm: {
          _icon: {
            size: 6,
          },
        },
      },
      variants: () => ({
        ghost: () => ({
          _icon: {
            color: 'black',
          },
          _dark: {
            _icon: {
              color: 'white',
            },
          },
        }),
      }),
    },

    StatusBar: {
      baseStyle: () => ({
        _light: {
          barStyle: 'dark-content',
        },
        _dark: {
          barStyle: 'light-content',
        },
      }),
    },

    Text: {
      baseStyle: () => ({
        _light: {
          color: common.colours.darkGrey100,
          padding: '2',
        },
        _dark: {
          color: common.colours.offWhite100,
          padding: '2',
        },
      }),
    },
  },

  useSystemColorMode: false, // Couldn't get this to have any effect when testing -- also not sure if/how to set this dynamically, so instead handling this using useSystemColourMode with Store/Theme
})

export const NavigationTheme = {
  hello: 1,
}

export default StaTheme
