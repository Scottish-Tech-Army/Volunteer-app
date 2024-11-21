/**
 * @file Container for showing a list of things (e.g. projects or events -- can be extended to show other types of things in the future).
 * It can show everything (e.g. all projects), or just the results of a search.
 * Pass in parameters by using navigate() -- see ListRouteParams below.
 * To add a new type of thing, look for references to projects below and you can mostly copy and adapt the projects code.
 */

/* eslint-disable @typescript-eslint/no-shadow */

import {
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Tag,
  VStack,
  Text,
  Pressable,
  View,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { EventSearch } from '@/Containers/EventSearchContainer'
import { ProjectSearch } from './ProjectSearchContainer'
import EventOptions from '@/Components/Event/EventOptions'
import EventSearchUpcomingQuickSearch, {
  EventQuickSearchUpcomingChoice,
} from '@/Components/Event/EventSearchQuickSearchUpcoming'
import List, {
  ListDisplayMode,
  ListOptions,
} from '@/NativeBase/Components/List'
import ProjectFilterSort from '@/Components/Project/ProjectFilterSort'
import TopOfApp from '@/NativeBase/Components/TopOfApp'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { heightOfTopOfAppPlusBottomNav } from '@/Utils/Layout'
import { capitaliseFirstLetter } from '@/Utils/Text'

import { SegmentedPickerOption } from '../Components/SegmentedPicker'

import {
  Events,
  EventsRange,
  useLazyFetchAllPastEventsQuery,
  useLazyFetchAllUpcomingEventsQuery,
} from '@/Services/modules/events'
import {
  Projects,
  useLazyFetchAllProjectsQuery,
} from '@/Services/modules/projects'
import { EventsState, setEvents } from '@/Store/Events'
import { ProjectsState, setProjects } from '@/Store/Projects'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import SkeletonLoading from '../Components/SkeletonLoading'
import FreeSearchBar from '../Components/FreeSearchBar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TagButtons from '../Components/TagButtons'
import ProjectSearchContainer from './ProjectSearchContainer'
import MyExperienceContainer from './MyExperienceContainer'
import { RoleGroup, roleGroups } from '@/Services/modules/projects/roleGroups'

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
  const [roleSearchText, setRoleSearchText] = useState('')
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
  // Filter roles based on the search text
  const filteredRoles = roleGroups.filter((roleGroup: RoleGroup) =>
    roleGroup.groupName.toLowerCase().includes(roleSearchText.toLowerCase()),
  )

  // Handle role search submit
  const handleRoleSearchChange = (text: string) => {
    setRoleSearchText(text)
  }

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
  const [searchText, setSearchText] = useState('')

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

  // const onSubmitEditing = (text: string) => text

  return (
    <>
      {/* <TopOfApp
        showSearchButton
        onSearchButtonPress={() => navigate(screens.search[params.type], '')}
      /> */}
      {/* TODO: reinstate when functionality is ready */}
      {/* <SegmentedPicker options={projectListOptions} /> */}

      <VStack space={2} alignItems="stretch">
        <VStack mt="4" px="4">
          <Heading size="xl" marginBottom="15px">
            Roles
          </Heading>
          <HStack space="2" alignItems="center" width="100%">
            <View flex={1}>
              <FreeSearchBar
                handleSubmit={handleRoleSearchChange}
                handleChangeText={handleRoleSearchChange}
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
              <IconButton
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

          {/* Display filtered roles based on the search */}
          <SearchResultsView>
            {roleSearchText && filteredRoles.length > 0 && (
              <>
                <SearchResultsLabel>
                  Roles matching "{roleSearchText}"
                </SearchResultsLabel>
                {filteredRoles.map((roleGroup, index) => (
                  <Text key={index} marginY="0.5">
                    {roleGroup.groupName}
                  </Text>
                ))}
              </>
            )}
          </SearchResultsView>
        </VStack>

        <VStack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ProjectSearchContainer />
            <ProjectSearchContainer />
            <ProjectSearchContainer />
          </ScrollView>
        </VStack>
        <ScrollView>
          <VStack alignItems="center" space={4}>
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

                {/* If the user has searched, show some text indicating what they searched for
                and give them the option to clear the search */}
                {params?.search && (
                  <SearchResultsView>
                    {params?.search?.description && (
                      <SearchResultsLabel>
                        Results for {params.search.description}
                      </SearchResultsLabel>
                    )}
                    <ClearSearchLabel onPress={clearSearch}>
                      Clear search
                    </ClearSearchLabel>
                  </SearchResultsView>
                )}

                {/* Projects filter & sort options */}
                {params.type === ListType.Projects &&
                  Boolean(params?.search) &&
                  Boolean(listItemsToShow.length) && <ProjectFilterSort />}

                <List
                  data={listItemsToShow}
                  mode={
                    params?.search
                      ? ListDisplayMode.Search
                      : ListDisplayMode.Full
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
        </ScrollView>
      </VStack>
    </>
  )
}

export default ListContainer
