/**
 * @file Runs the app!
 */
import Bugsnag from '@bugsnag/expo'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NativeBaseProvider } from '@gluestack-ui/themed-native-base'
import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import '@/NativeBase/Assets/Icons/init'
import ColourModeManager from '@/NativeBase/Theme/ColourModeManager'
import StaTheme from '@/NativeBase/Theme/StaTheme'
import ApplicationNavigator from '@/Navigators/Application'
import { store, persistor } from '@/Store'
import { isDevelopmentMode } from '@/Utils/Expo'
import { isJson } from '@/Utils/Json'
import { version } from './package.json'
import { AuthClient, AuthProvider } from '@/Services/auth'
import { FeatureFlagsProvider } from '@/Services/featureFlags'

SplashScreen.preventAutoHideAsync()
if (!Constants.expoConfig?.extra?.api?.baseUrl) {
  throw new Error(`Missing variable in App.tsx, "baseUrl"`)
}
if (!Constants.expoConfig?.extra?.api?.version) {
  throw new Error(`Missing variable in App.tsx, "version"`)
}
const authClient = new AuthClient({
  baseUrl: `${Constants.expoConfig.extra.api.baseUrl}/${Constants.expoConfig.extra.api?.version}`,
  trace: console.log,
})

const App = () => {
  const [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./src/Assets/Fonts/BebasNeue-Regular.ttf'),
    IcoMoon: require('./assets/icomoon.ttf'), // could only get this to work with font file in this directory, following example at https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
    'Poppins-Black': require('./src/Assets/Fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('./src/Assets/Fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('./src/Assets/Fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('./src/Assets/Fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('./src/Assets/Fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('./src/Assets/Fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('./src/Assets/Fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('./src/Assets/Fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('./src/Assets/Fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./src/Assets/Fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('./src/Assets/Fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('./src/Assets/Fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./src/Assets/Fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('./src/Assets/Fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./src/Assets/Fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./src/Assets/Fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('./src/Assets/Fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('./src/Assets/Fonts/Poppins-ThinItalic.ttf'),
  })
  const [displayApp, setDisplayApp] = useState(false)

  useEffect(() => {
    // If in production app or we're forcing always send bugs, enable Bugsnag
    if (
      !isDevelopmentMode() ||
      Constants.expoConfig?.extra?.bugsnag?.alwaysSendBugs
    ) {
      if (Constants.expoConfig?.extra?.bugsnag?.apiKey) {
        Bugsnag.start({
          apiKey: Constants.expoConfig.extra.bugsnag.apiKey,
          appVersion: version,
          releaseStage: isDevelopmentMode() ? 'development' : 'production',
        })
      } else {
        console.error(
          '❌ Could not enable Bugsnag -- BUGSNAG_API_KEY environment variable is required',
        )
      }
    }

    // Check STA API settings -- helpful check for devs
    if (isDevelopmentMode()) {
      if (!Constants.expoConfig?.extra?.api?.baseUrl) {
        console.error(
          '❌  Could not get the STA API URL -- you are probably missing the STA_API_BASE_URL value in your .env file',
        )
      } else if (
        Constants.expoConfig?.extra?.api?.baseUrl === 'https://the-sta.com'
      ) {
        console.warn(
          '❗  You are running in development mode but you are using the production API server -- this is usually a bad idea, you should be using your local API development server instead. You probably need to stop the app, add a STA_API_BASE_URL value to your .env file, and then restart it.',
        )
      } else {
        console.log(
          `🛈 Using API server at ${Constants.expoConfig?.extra?.api?.baseUrl} (not sure if it's working? try ${Constants.expoConfig?.extra?.api?.baseUrl}/v1.1/projects in postman)`,
        )
      }

      if (!Constants.expoConfig?.extra?.api?.version) {
        console.error(
          '❌ Could not get the STA API version number -- you are probably missing the STA_API_VERSION value in your .env file',
        )
      } else {
        console.log(
          `🛈 Using API version: ${Constants.expoConfig?.extra?.api?.version}`,
        )
      }

      // Check tunnelled API to see if it's working -- helpful check for devs when you're running the API locally
      fetch(`${Constants.expoConfig?.extra?.api?.baseUrl}/v1/projects`).then(
        response => {
          if (response.status !== 200) {
            console.error(
              `❗ The API server at ${Constants.expoConfig?.extra?.api?.baseUrl}/v1/projects is not working`,
            )
          } else {
            response.text().then(text => {
              if (!text) {
                console.error(
                  `❗ The API server at ${Constants.expoConfig?.extra?.api?.baseUrl}/v1/projects is not working`,
                )
              } else if (!isJson(text)) {
                console.error(
                  `❗ Check your API server URL ${Constants.expoConfig?.extra?.api?.baseUrl}/v1/projects in a browser - you may need to enter your public IP address to get the API tunnel working, then stop and restart Expo`,
                )
              }
            })
          }
        },
      )
    }
  }, [])

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().then(() => setDisplayApp(true))
  }, [fontsLoaded])

  if (!displayApp) return null

  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider
          colorModeManager={ColourModeManager}
          theme={StaTheme}
        >
          <AuthProvider client={authClient} blockUntilInitialised={true}>
            <FeatureFlagsProvider
              features={Constants.expoConfig?.extra?.features}
            >
              <ApplicationNavigator />
            </FeatureFlagsProvider>
          </AuthProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
