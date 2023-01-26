/**
 * @file React Native configuration.
 */

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/Assets/Fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
}
