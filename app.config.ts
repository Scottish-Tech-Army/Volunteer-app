/**
 * @file Expo configuration file.
 */

import 'dotenv/config'
import { version } from './package.json'

const enabledFeatures = !process.env.FEATURES_ENABLED
  ? []
  : process.env.FEATURES_ENABLED.split(',')

module.exports = {
  expo: {
    name: 'STA Volunteers',
    slug: 'volunteer-app',
    owner: 'scottish-tech-army',
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
    updates: {
      url: 'https://u.expo.dev/9cd93ab4-ee33-43d1-a995-e4f8531553e2',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/sta-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'org.scottishtecharmy.volunteerapp',
    },
    ios: {
      bundleIdentifier: 'org.scottishtecharmy.volunteerapp',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCalendarsUsageDescription:
          "The app will show tech/volunteering-related events that the user might be interested in. The user can choose to attend an event - if so, the app needs access to the user's calendar in order to add an event.",
      },
      supportsTablet: true,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      features: enabledFeatures,
      api: {
        baseUrl: process.env.STA_API_BASE_URL,
        dynamoUrl: process.env.STA_DYNAMO_API_URL,
        version: process.env.STA_API_VERSION,
        apiKey: process.env.STA_API_KEY,
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
    plugins: ['expo-font', 'expo-secure-store'],
  },
}
