/**
 * @file Used to navigate without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'

export type RootStackParamList = {
  Startup: undefined
  Projects: undefined
  ProjectDetail: undefined
  ProjectRegisterInterest: undefined
  ProjectSearch: undefined
  Events: undefined
  EventDetail: undefined
  EventSearch: undefined
  ProjectScope: undefined
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

/**
 * Go back to the previous screen (like pressing the back button on your browser).
 */
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
  }
}

/**
 * Navigate to another screen in the app.
 *
 * @param {keyof RootStackParamList} name A screen name -- these are defined above by RootStackParamList
 * @param {any} params Parameters to pass to the screen (check the relevant container for what these should be)
 */
export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

/**
 * Reset the navigation state to the provided state.
 * @param {routes} routes of the navigation.
 * @param {index} index of the route to reset.
 */
export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

/**
 * Reset the navigation state to the provided state.
 * @param {name} name of the route to navigate to.
 * @param {index} index of the route to reset.
 */
export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}
