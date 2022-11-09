/**
 * @file Navigators/utils
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import { EventSearchInterface } from '@/Containers/EventSearchContainer'
import { EventsRange } from '@/Services/modules/events'
import { Project, ProjectsSearchField } from '@/Services/modules/projects'
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'

/**
 * Defines the type of params expected when navigating to each screen
 */
type RootStackParamList = {
  Startup: undefined
  Home: undefined
  ProjectDetail: {
    item: Project
    key: string
  }
  ProjectRegisterInterest: {
    project: Project
  }
  ProjectSearch: string | undefined
  ProjectSearchResults: {
    results: (Project | Event)[]
    searchField: ProjectsSearchField | undefined
    searchQuery: string
  }
  Events: {
    screen?: 'Events'
    selectedOption?: EventsRange | 'myEvents'
    search?: EventSearchInterface
  }
  EventDetail: {
    event: Event
    key: string
  }
  EventSearch: string | undefined
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
 * @param {keyof RootStackParamList} name of the route to navigate to.
 * @param {RootStackParamList[RouteName]} params object for the route.
 */
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName],
) {
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
