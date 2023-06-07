/**
 * @file Enables logging to an external service (currently Bugsnag).
 */

import Bugsnag from '@bugsnag/expo'
import Constants from 'expo-constants'
import { store } from '@/Store'
import { isDevelopmentMode } from '@/Utils/Expo'

/**
 * Logs errors to Bugsnag.
 *
 * @param {string} errorMessage An error message
 * @param {unknown} extraInfo Any extra info about the error -- e.g. some data or a caught exception
 * @returns {React.ReactElement} Component
 */
export const logError = (errorMessage: string, extraInfo?: unknown) => {
  const { permissions } = store.getState()

  if (isDevelopmentMode()) {
    console.error(errorMessage)
    if (extraInfo) console.error(extraInfo)
  }

  if (
    (!isDevelopmentMode() && permissions.data.errorLogs) ||
    Constants.expoConfig?.extra?.bugsnag?.alwaysSendBugs
  ) {
    Bugsnag.notify(
      new Error(errorMessage),
      event => {
        event.addMetadata('developmentMode', {
          isDevelopmentMode: isDevelopmentMode(),
        })

        if (extraInfo) event.addMetadata('extraInfo', extraInfo)
      },
      (bugsnagError, event) => {
        if (bugsnagError)
          console.error(
            'There was a problem sending a bug report to Bugsnag',
            bugsnagError,
            event,
          )
      },
    )
  }
}
