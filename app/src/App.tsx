/**
 * @file Runs the app!
 */
import { NativeBaseProvider } from 'native-base'
import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import ThemeProvider from '@/Theme/OldTheme'
import './Translations'
import '@/NativeBase/Assets/Icons/init'
import ColourModeManager from './NativeBase/Theme/ColourModeManager'
import StaTheme from './NativeBase/Theme/StaTheme'

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider colorModeManager={ColourModeManager} theme={StaTheme}>
        <ThemeProvider>
          <ApplicationNavigator />
        </ThemeProvider>
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
)

export default App
