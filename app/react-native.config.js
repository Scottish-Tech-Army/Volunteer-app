/**
 * @file React Native configuration.
 */

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/NativeBase/Assets/Fonts/'],
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
}
