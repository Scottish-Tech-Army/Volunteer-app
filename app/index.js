/**
 * @file Initiates the creation of the app
 * @format
 */

import Bugsnag from '@bugsnag/react-native'
import { AppRegistry } from 'react-native'
import { isEmulatorSync } from 'react-native-device-info'
import App from './src/App'
import { name as appName } from './app.json'

// Only report React Native code errors to Bugsnag on real devices, not emulators
if (!isEmulatorSync()) Bugsnag.start({ appType: 'native_app' })

AppRegistry.registerComponent(appName, () => App)
