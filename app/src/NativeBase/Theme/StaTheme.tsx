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
    white: '#ffffff',
  },
  icons: {
    size: 8,
  },
  fonts: {
    family: {
      primary: 'Poppins',
    },
  },
}

const StaTheme = extendTheme({
  colors: {
    //pink
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
      100: common.colours.white,
      secondary: common.colours.offWhite100,
    },
    bgDarkMode: {
      100: common.colours.darkGrey100,
    },
    error: {
      100: '#e30613',
    },
    focus: {
      100: common.colours.darkGrey100,
    },
    accentGreen: '#1d781d',
    accentOrange: '#ec6730',
    accentGrey: '#a9a9a9',
    blue: {
      100: '#31729b',
      80: '#3583af',
      60: '#44a3cf',
      40: '#67bddb',
      20: '#b6e3f0',
    },
    purple: {
      100: '#604696',
      80: '#775FA5',
      60: '#8E7BB5',
      40: '#AEA0CA',
      20: '#CDC6DF',
    },
    grey: {
      100: '#E6E6E6',
      80: '#F1F1F1',
      60: '#F6F6F6',
      40: common.colours.offWhite100,
      20: common.colours.white,
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
    primary: common.fonts.family.primary,
    heading: common.fonts.family.primary,
    body: common.fonts.family.primary,
  },

  components: {
    Heading: {
      baseStyle: {
        color: common.colours.darkGrey100,
        _dark: {
          color: common.colours.offWhite100,
        },
        fontFamily: common.fonts.family.primary,
        fontWeight: '600',
      },
    },

    Button: {
      baseStyle: {
        rounded: 'full',
        marginX: '2',
        paddingY: '0',
        marginBottom: '5',
        height: '12',
      },
      defaultProps: {
        bg: 'primary.100',
        _pressed: {
          bg: 'primary.60',
        },
        _text: {
          fontWeight: '600',
          fontSize: 'xl',
          padding: '0',
          color: common.colours.white,
        },
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
        fontFamily: common.fonts.family.primary,
        fontWeight: '400',
      }),
    },
  },

  useSystemColorMode: false, // Couldn't get this to have any effect when testing -- also not sure if/how to set this dynamically, so instead handling this using useSystemColourMode with Store/Theme
})

export default StaTheme
