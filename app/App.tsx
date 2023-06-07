/**
 * @file Runs the app!
 */
import Bugsnag from '@bugsnag/expo'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NativeBaseProvider } from 'native-base'
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

SplashScreen.preventAutoHideAsync()

/**
 * @returns {React.FunctionComponent} A React functional component that returns the app
 */
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
    if (
      !isDevelopmentMode() ||
      Constants.expoConfig?.extra?.bugsnag?.alwaysSendBugs
    ) {
      Bugsnag.start({
        apiKey: Constants.expoConfig?.extra?.bugsnag?.apiKey,
      })
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
          <ApplicationNavigator />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
