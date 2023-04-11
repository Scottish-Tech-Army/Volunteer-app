/**
 * @file Enables logging to an external service (currently Bugsnag).
 */

import Bugsnag from '@bugsnag/react-native'
import Config from 'react-native-config'
import { isEmulator } from 'react-native-device-info'
import { store } from '@/Store'

/**
 * Logs errors to Bugsnag.
 *
 * @param {string} errorMessage An error message
 * @param {unknown} extraInfo Any extra info about the error -- e.g. some data or a caught exception
 * @returns {React.ReactElement} Component
 */
export const logError = (errorMessage: string, extraInfo?: unknown) => {
  const { permissions } = store.getState()

  isEmulator().then(appIsEmulator => {
    if (appIsEmulator) {
      console.error(errorMessage)
      if (extraInfo) console.error(extraInfo)
    }

    if (
      (!appIsEmulator && permissions.data.errorLogs) ||
      Config.BUGSNAG_ALWAYS_SEND_BUGS === 'true'
    ) {
      Bugsnag.notify(new Error(errorMessage), event => {
        if (extraInfo) event.addMetadata('extraInfo', extraInfo)
      })
    }
  })
}
