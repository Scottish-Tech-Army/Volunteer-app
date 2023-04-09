import Bugsnag from '@bugsnag/react-native'

export interface EventInfo {
  exception?: unknown
}

export const logError = (errorMessage: string, eventInfo?: EventInfo) => {
  console.error(errorMessage)

  Bugsnag.notify(new Error(errorMessage), event => {
    if (eventInfo?.exception)
      event.addMetadata('exception', eventInfo.exception)
  })
}
