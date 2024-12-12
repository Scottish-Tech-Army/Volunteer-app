/**
 * @file Container for showing a list of things (e.g. projects or events -- can be extended to show other types of things in the future).
 * It can show everything (e.g. all projects), or just the results of a search.
 * Pass in parameters by using navigate() -- see ListRouteParams below.
 * To add a new type of thing, look for references to projects below and you can mostly copy and adapt the projects code.
 */

/* eslint-disable @typescript-eslint/no-shadow */

import EventOptions from '@/Components/Event/EventOptions'
import EventSearchUpcomingQuickSearch, {
  EventQuickSearchUpcomingChoice,
} from '@/Components/Event/EventSearchQuickSearchUpcoming'
import { EventSearch } from '@/Containers/EventSearchContainer'
import FreeSearchBar from '@/NativeBase/Components/FreeSearchBar'
import List, {
  ListDisplayMode,
  ListOptions,
} from '@/NativeBase/Components/List'
import SkeletonLoading from '@/NativeBase/Components/SkeletonLoading'
import TopOfApp from '@/NativeBase/Components/TopOfApp'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import {
  Events,
  EventsRange,
  useLazyFetchAllPastEventsQuery,
  useLazyFetchAllUpcomingEventsQuery,
} from '@/Services/modules/events'
import {
  Project,
  Projects,
  useLazyFetchAllProjectsQuery,
} from '@/Services/modules/projects'
import { roleGroups } from '@/Services/modules/projects/roleGroups'
import { EventsState, setEvents } from '@/Store/Events'
import { ProjectsState, setProjects } from '@/Store/Projects'
import { fuzzySearchByArray } from '@/Utils/Search'
import { capitaliseFirstLetter } from '@/Utils/Text'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import Fuse from 'fuse.js'
import { HStack, Icon, IconButton, ScrollView, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import ProjectsTagButtonsFilter, {
  ProjectSearch,
} from '../Components/ProjectTagButtonsFilter'
import { SegmentedPickerOption } from '../Components/SegmentedPicker'

const ClearSearchLabel = styled.Text`

`
const SearchResultsLabel = styled.Text`
  
`
const SearchResultsView = styled.View`
 
`

export interface ListSearch {
  description: string // some text to tell the user what the search was for, e.g. the search text they entered
}

export enum ListType {
  Events = 'events',
  Projects = 'projects',
}

export interface ListRouteParams {
  type: ListType
  search?: EventSearch | ProjectSearch
  options: ListOptions
}

export type ListScreens = {
  [key in ListType]: keyof RootStackParamList
}

export const searchScreens = {
  [ListType.Events]: 'EventSearch',
  [ListType.Projects]: 'ProjectSearch',
} as ListScreens

/**
 * Container for showing a list of things
 *
 * @param {object} props The container props
 * @param {object} props.route A route object containing params
 * @param {ListRouteParams} props.route.params The parameters to send to this container when navigating, to set what it displays
 * @param {ListType} props.route.params.type The type of data to show in the list, e.g. events or projects
 * @param {EventSearch | ProjectSearch} [props.route.params.search] The search the user has performed - or not included if showing full list of data, not search results
 * @param {ListOptions} props.route.params.options Any additional options for specific data types, that tell the container how to behave
 * @returns {React.ReactElement} Container
 */
const ListContainer = (props: {
  route: {
    params: ListRouteParams
  }
}) => {
  /*
   *
   * Declare variables
   *
   */

  // Shared
  const dispatch = useDispatch()
  const [listItemsToShow, setListItemsToShow] = useState<Events | Projects>()

  const params = props.route.params

  const screens = {
    list: {
      [ListType.Events]: 'Events' as keyof RootStackParamList,
      [ListType.Projects]: 'Projects' as keyof RootStackParamList,
    } as ListScreens,
    search: searchScreens,
  }
  const windowHeight = Dimensions.get('window').height

  const projectListOptions = ['all', 'saved', 'my'].map(
    option =>
      ({
        text: capitaliseFirstLetter(option),
        onPress: option === 'all' ? () => undefined : underDevelopmentAlert,
      } as SegmentedPickerOption),
  )

  // Events-specific
  const [fetchAllUpcomingEvents, { data: allUpcomingEventsResult }] =
    useLazyFetchAllUpcomingEventsQuery()
  const [fetchAllPastEvents, { data: allPastEventsResult }] =
    useLazyFetchAllPastEventsQuery()
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )
  const allPastEvents = useSelector(
    (state: { events: EventsState }) => state.events.past,
  )
  const [eventsSelectedOption, setEventsSelectedOption] = useState<EventsRange>(
    EventsRange.Upcoming,
  )
  const [eventsShowUpcomingQuickSearch, setEventsShowUpcomingQuickSearch] =
    useState(false)
  const [eventsQuickSearchUpcomingChoice, setEventsQuickSearchUpcomingChoice] =
    useState<EventQuickSearchUpcomingChoice | undefined>()

  // Projects-specific
  const [fetchAllProjects, { data: allProjectsResult }] =
    useLazyFetchAllProjectsQuery()
  const allProjects = useSelector(
    (state: { projects: ProjectsState }) => state.projects?.projects,
  )
  // const [searchText, setSearchText] = useState('')

  // State for toggling icons
  const [iconState, setIconState] = useState<Record<string, boolean>>({
    Roles: false,
    Tech: false,
    Causes: false,
  })

  const handleTagPress = (tag: string) => {
    setIconState(prevState => ({
      ...prevState,
      [tag]: !prevState[tag], // Toggle the state
    }))
  }

  /*
   *
   * Shared logic
   *
   */

  // What to do when container is first created, e.g. fetch data from the API
  useEffect(() => {
    switch (params.type) {
      case ListType.Events:
        fetchAllUpcomingEvents('')
        fetchAllPastEvents('')
        break
      case ListType.Projects:
        fetchAllProjects('')
        break
    }
  }, [
    fetchAllUpcomingEvents,
    fetchAllPastEvents,
    fetchAllProjects,
    params.type,
  ])

  // When data has loaded, store data in the Redux store so it can be used by other containers/components too e.g. search containers
  useEffect(() => {
    if (allUpcomingEventsResult) {
      dispatch(setEvents({ upcoming: allUpcomingEventsResult }))
    }
    if (allPastEventsResult) {
      dispatch(setEvents({ past: allPastEventsResult }))
    }
    if (allProjectsResult) {
      dispatch(setProjects({ projects: allProjectsResult }))
    }
  }, [
    allUpcomingEventsResult,
    allPastEventsResult,
    allProjectsResult,
    dispatch,
  ])

  // What to do when the user navigates to this container
  // e.g. set which data to show -- either search results or everything
  useEffect(() => {
    if (params?.search) {
      setListItemsToShow(params.search.results)
    }

    switch (params.type) {
      case ListType.Events:
        if (
          !params?.search &&
          allUpcomingEvents &&
          eventsSelectedOption === EventsRange.Upcoming
        ) {
          setListItemsToShow(allUpcomingEvents)
        } else if (allPastEvents && eventsSelectedOption === EventsRange.Past) {
          setListItemsToShow(allPastEvents)
        }
        break

      case ListType.Projects:
        if (!params?.search) {
          setListItemsToShow(allProjects)
        }
        break
    }
  }, [
    params?.search,
    params?.type,
    allUpcomingEvents,
    allPastEvents,
    eventsSelectedOption,
    allProjects,
  ])

  // Ensure job title searches find related roles
  const getRelatedRoles = (
    possibleRoleSearchQuery: string,
  ): string[] | undefined => {
    const fuse = new Fuse(roleGroups, {
      keys: ['roleNames'],
      minMatchCharLength: 2,
      threshold: 0.1,
    })

    const fuseResults = fuse.search(possibleRoleSearchQuery)

    if (fuseResults.length) {
      const roles = []

      for (const fuseResult of fuseResults) {
        for (const role of fuseResult.item.roleNames) {
          roles.push(role)
        }
      }

      return roles
    }

    return undefined
  }

  const handleFreeTextSubmit = (freeTextSearchQuery: string) => {
    // Add free text to list of search queries
    const searchQueries = [freeTextSearchQuery]

    // If the free text query matches a group of job roles, add these to the list of search queries too
    const relatedRoles = getRelatedRoles(freeTextSearchQuery)
    if (relatedRoles?.length) {
      searchQueries.push(...relatedRoles)
    }

    const results = fuzzySearchByArray(
      allProjects,
      [
        { name: 'client', weight: 1 },
        { name: 'description', weight: 0.5 },
        { name: 'name', weight: 1 },
        { name: 'role', weight: 1 },
        { name: 'skills', weight: 1 },
        { name: 'sector', weight: 1 },
      ],
      searchQueries,
    )

    const description = `"${freeTextSearchQuery}"`

    navigate(
      'Projects' as keyof RootStackParamList,
      {
        type: ListType.Projects,
        search: {
          results,
          description,
        } as ProjectSearch,
      } as ListRouteParams,
    )
  }

  // Clear the search so the user's seeing all data instead
  const clearSearch = () => {
    if (params?.type) {
      navigate(screens.list[params.type], {
        type: params.type,
        search: undefined,
      } as ListRouteParams)
    }
  }

  /*
   *
   * Events-specific logic
   *
   */

  // What to do when the user changes search options or they tap Past/Upcoming/My events
  useEffect(() => {
    if (params?.type === ListType.Events) {
      const eventsSearch = params?.search as EventSearch

      // Past/Upcoming/My events choice
      const selectedOption =
        params?.options?.events?.range ??
        eventsSearch?.range ??
        EventsRange.Upcoming

      setEventsSelectedOption(selectedOption)

      // If the user has done a quick search for upcoming events (Today / This week / This month)
      // then show it here too above search results so they can change to one of these other
      // quick search options directly rather than having to go back to the search screen
      const showUpcomingQuickSearch =
        selectedOption === EventsRange.Upcoming &&
        eventsSearch?.range === EventsRange.Upcoming &&
        Boolean(eventsSearch?.quickSearchUpcomingChoice)
      setEventsShowUpcomingQuickSearch(showUpcomingQuickSearch)

      setEventsQuickSearchUpcomingChoice(
        eventsSearch?.quickSearchUpcomingChoice,
      )
    }
  }, [params?.options?.events, params?.search, params?.type])

  function updateListForTestWithRoleWebDeveloper(): void {
    //TODO
    // 1. when we click on the button, we want the list of projects to be filtered for roles category web-developer and displayed on the same screen.
    /*
        console.log(listItemsToShow!.map((item: Project) => item.role).join(', '))
        const filteredList: Project[] = listItemsToShow!.filter((item: Project) => item.role === 'User Researcher')
        setListItemsToShow(filteredList)
    */
    /* THIS DOES NOT WORK
const filteredList: Project[] = listItemsToShow!.filter((item: Project) => item.role === 'User Researcher')
params.search = { results: filteredList, description: 'fake filtering' } as ProjectSearch
*/

    /* THIS WORKS TOO: calling directly the already partly implemented search functionality of the ListContainer component
     */
    const searchResults: ProjectSearch = {
      description: 'test description',
      results: (listItemsToShow as Projects).filter(
        (item: Project) => item.role === 'User Researcher',
      ),
    }
    navigate(screens.list[params.type], {
      type: params.type,
      search: searchResults,
    } as ListRouteParams)

    // 2. we want to use existing filtering logic to manipulate the list of projects and show it in the list
    // 3. we are really cool and start using maybe redux selectors to apply the filtering (maybe?)
    // 4. step 3 is OPTIONAL. once we have managed to get to step 2, we will now focus on doing roles filtering using our tagbuttons.
    // 5. we will extend this logic also to the tech and fields area
    // 6. we will now focus on the fullsearch bar - maybe break down in additional sub tasks to make progress easier...
    // 7. we clean up unused components
    // 8. we start refactoring and making the code/architecture more clean
  }

  // const onSubmitEditing = (text: string) => text

  return (
    <>
      <TopOfApp showSearchButton={false} />
      {/* TODO: reinstate when functionality is ready */}
      {/* <SegmentedPicker options={projectListOptions} /> */}

      <VStack space={2} alignItems="stretch">
        <VStack mt="4" px="4">
          <HStack space="2" alignItems="center" width="100%">
            <View flex={1}>
              <FreeSearchBar
                handleSubmit={handleFreeTextSubmit}
                handleClearSearch={clearSearch}
                marginBottom="2"
              />
            </View>
            <View
              marginBottom="2"
              height="48px"
              width="48px"
              bg="#F0F0F0"
              borderRadius="10px"
              padding="2"
              mx="10px"
              justifyContent="center"
              alignItems="center"
            >
              {/* TODO remove button once not needed anymore for testing SVA-444 */}
              <IconButton
                onPress={updateListForTestWithRoleWebDeveloper}
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="tune"
                    size="24px"
                    color="gray.500"
                  />
                }
              />
            </View>
          </HStack>
        </VStack>

        <VStack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ProjectsTagButtonsFilter />
          </ScrollView>
        </VStack>
        <VStack alignItems="center" space={4} mx={4}>
          {params?.type && listItemsToShow ? (
            <>
              {/* Past / Upcoming / My Events choice */}
              {params.type === ListType.Events && (
                <EventOptions selected={eventsSelectedOption} />
              )}

              {/* Quick search for upcoming events (Today / This week / This month) */}
              {params.type === ListType.Events &&
                eventsShowUpcomingQuickSearch &&
                eventsQuickSearchUpcomingChoice && (
                  <SearchResultsView>
                    <EventSearchUpcomingQuickSearch
                      selectedButton={eventsQuickSearchUpcomingChoice}
                    />
                  </SearchResultsView>
                )}

              <List
                data={listItemsToShow}
                mode={
                  params?.search ? ListDisplayMode.Search : ListDisplayMode.Full
                }
                options={params?.options}
                searchScreen={screens.search[params.type]}
                type={params.type}
              />
            </>
          ) : (
            <>
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </>
          )}
        </VStack>
      </VStack>
    </>
  )
}

export default ListContainer
