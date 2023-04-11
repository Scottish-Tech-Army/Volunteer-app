import Bugsnag from '@bugsnag/react-native'
import { isEmulator } from 'react-native-device-info'
import { store } from '@/Store'

export interface EventInfo {
  extraInfo?: unknown
}

export const logError = (errorMessage: string, eventInfo?: EventInfo) => {
  const { permissions } = store.getState()

  isEmulator().then(appIsEmulator => {
    if (appIsEmulator) {
      console.error(errorMessage)
      if (eventInfo) console.error(eventInfo)
    } else if (permissions.data.errorLogs) {
      Bugsnag.notify(new Error(errorMessage), event => {
        if (eventInfo?.extraInfo)
          event.addMetadata('extraInfo', eventInfo.extraInfo)
      })
    }
  })
}
