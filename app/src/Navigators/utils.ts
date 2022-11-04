/**
 * @file Navigators/utils
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'

type RootStackParamList = {
  Startup: undefined
  Home: undefined
  ProjectDetail: undefined
  ProjectRegisterInterest: undefined
  ProjectSearch: undefined
  ProjectSearchResults: undefined
  Events: undefined
  EventDetail: undefined
  EventSearch: undefined
  ProjectScope: undefined
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

/**
 * Button to go back
 */
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
  }
}

/**
 * Navigate to a route in current navigation tree
 * @param {name} name of the route to navigate to.
 * @param {params} params object for the route.
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
