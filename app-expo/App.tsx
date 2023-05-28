/**
 * @file Runs the app!
 */
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

SplashScreen.preventAutoHideAsync()

/**
 * @returns {React.FunctionComponent} A React functional component that returns the app
 */
const App = () => {
  const [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./src/Assets/Fonts/BebasNeue-Regular.ttf'),
    'Poppins-Bold': require('./src/Assets/Fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./src/Assets/Fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./src/Assets/Fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./src/Assets/Fonts/Poppins-Medium.ttf'),
  })
  const [displayApp, setDisplayApp] = useState(false)

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().then(() => setDisplayApp(true))
  }, [fontsLoaded])

  if (!displayApp) {
    return null
  }

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
