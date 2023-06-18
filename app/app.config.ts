/**
 * @file Expo configuration file.
 */

import 'dotenv/config'
import { version } from './package.json'

module.exports = {
  expo: {
    name: 'STA',
    slug: 'volunteer-app',
    version,
    orientation: 'portrait',
    icon: './assets/sta-icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash-screen.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/sta-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'org.scottishtecharmy.volunteerapp',
      versionCode: 15,
    },
    ios: {
      bundleIdentifier: 'org.scottishtecharmy.volunteerapp',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCalendarsUsageDescription:
          "The app will show tech/volunteering-related events that the user might be interested in. The user can choose to attend an event - if so, the app needs access to the user's calendar in order to add an event.",
      },
      buildNumber: '17',
      supportsTablet: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      api: {
        baseUrl: process.env.STA_API_BASE_URL ?? 'https://the-sta.com',
        version: process.env.STA_API_VERSION ?? 'v1',
      },
      bugsnag: {
        alwaysSendBugs: process.env.BUGSNAG_ALWAYS_SEND_BUGS
          ? process.env.BUGSNAG_ALWAYS_SEND_BUGS === 'true'
          : false,
        apiKey: process.env.BUGSNAG_API_KEY,
      },
      eas: {
        projectId: process.env.EXPO_APPLICATION_SERVICES_PROJECT_ID,
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
