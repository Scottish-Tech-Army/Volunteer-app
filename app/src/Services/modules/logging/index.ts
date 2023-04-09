import Bugsnag from '@bugsnag/react-native'
import { isEmulator } from 'react-native-device-info'

export interface EventInfo {
  extraInfo?: unknown
}

export const logError = (errorMessage: string, eventInfo?: EventInfo) => {
  console.error(errorMessage)
  if (eventInfo) console.error(eventInfo)

  isEmulator().then(appIsEmulator => {
    if (!appIsEmulator)
      Bugsnag.notify(new Error(errorMessage), event => {
        if (eventInfo?.extraInfo)
          event.addMetadata('extraInfo', eventInfo.extraInfo)
      })
  })
}
