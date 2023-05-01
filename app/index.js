/**
 * @file Initiates the creation of the app
 * @format
 */

import Bugsnag from '@bugsnag/react-native'
import Config from 'react-native-config'
import { AppRegistry } from 'react-native'
import { isEmulatorSync } from 'react-native-device-info'
import App from './src/App'
import { name as appName } from './app.json'

// Only report React Native code errors to Bugsnag on real devices, not emulators
if (!isEmulatorSync() || Config.BUGSNAG_ALWAYS_SEND_BUGS === 'true')
  Bugsnag.start()

AppRegistry.registerComponent(appName, () => App)
