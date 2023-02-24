/**
 * @file Theme definition for NativeProvider
 * https://www.figma.com/file/RgxknLjxmS2CqBEDEZWPCU/STA-Volunteer-App---New-Designs
 */

import { extendTheme } from 'native-base'

// Common values that are repeated should go here
const common = {
  colours: {
    pink100: '#d1338A',
    purple100: '#604696',
    lightGrey100: '#a9a9a9',
    secondaryGrey100: '#e6e6e6',
    darkGrey100: '#3c3c3b',
    offWhite100: '#fbfbfb',
  },
  fonts: {
    family: {
      primary: 'Poppins',
    },
    size: {
      '2xs': 10,
      xs: 12,
      sm: 18,
      md: 20,
      lg: 24,
      xl: 28,
      '2xl': 32,
      '3xl': 36,
      '4xl': 40,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
      '9xl': 128,
    },
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
    textDarkMode: {
      100: common.colours.offWhite100,
    },
    bg: {
      100: common.colours.offWhite100,
    },
    bgDarkMode: {
      100: common.colours.darkGrey100,
    },
    border: {
      100: common.colours.lightGrey100,
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
    accentPurple: {
      100: common.colours.purple100,
    },
    darkGrey: {
      100: common.colours.darkGrey100,
    },
    secondaryGrey: {
      100: common.colours.secondaryGrey100,
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
    body: common.fonts.family.primary,
    heading: common.fonts.family.primary,
    primary: common.fonts.family.primary,
  },

  fontSizes: common.fonts.size,

  // Open the extendTheme files referenced above to see all the components and default properties you can set
  components: {
    Divider: {
      baseStyle: {
        bg: common.colours.lightGrey100,
        _dark: {
          bg: common.colours.lightGrey100,
        },
      },
    },

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

    Input: {
      baseStyle: () => ({
        placeholderTextColor: 'text.100',
        _dark: {
          color: 'textDarkMode.100',
        },
      }),
      sizes: {
        md: {
          fontSize: common.fonts.size.md,
        },
        sm: {
          fontSize: common.fonts.size.md,
        },
      },
    },

    ScrollView: {
      defaultProps: {
        padding: '4',
      },
    },

    Text: {
      baseStyle: () => ({
        _light: {
          color: 'darkGrey.100',
          padding: '2',
        },
        _dark: {
          color: 'textDarkMode.100',
          padding: '2',
        },
      }),
      defaultProps: {
        fontSize: common.fonts.size.md,
      },
    },
  },

  useSystemColorMode: false, // Couldn't get this to have any effect when testing -- also not sure if/how to set this dynamically, so instead handling this using useSystemColourMode with Store/Theme
})

export default StaTheme
