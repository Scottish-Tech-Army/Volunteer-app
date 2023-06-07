import 'dotenv/config'
import { version } from './package.json'

module.exports = {
  expo: {
    name: 'STA',
    displayName: 'STA Volunteers',
    slug: 'sta',
    version,
    orientation: 'portrait',
    icon: './assets/sta-icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-screen.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/sta-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      bugsnag: {
        alwaysSendBugs: process.env.BUGSNAG_ALWAYS_SEND_BUGS
          ? process.env.BUGSNAG_ALWAYS_SEND_BUGS === 'true'
          : false,
        apiKey: process.env.BUGSNAG_API_KEY,
      },
    },
    hooks: {
      postPublish: [
        {
          file: '@bugsnag/expo/hooks/post-publish.js',
          config: {},
        },
      ],
    },
  },
}
