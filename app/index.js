/**
 * @file Initiates the creation of the app
 * @format
 */

import Bugsnag from '@bugsnag/react-native'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

Bugsnag.start({ appType: 'app' })

AppRegistry.registerComponent(appName, () => App)
