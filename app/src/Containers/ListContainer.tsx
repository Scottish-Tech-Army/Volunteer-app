/**
 * @file Container for showing a list of things (e.g. projects or events -- can be extended to show other types of things in the future).
 * It can show everything (e.g. all projects), or just the results of a search.
 * Pass in parameters by using navigate() -- see ListRouteParams below.
 * To add a new type of thing, look for references to projects below and you can mostly copy and adapt the projects code.
 */

/* eslint-disable @typescript-eslint/no-shadow */

import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { EventSearch } from './EventSearchContainer'
import { ProjectSearch } from './ProjectSearchContainer'
import EventOptions from '@/Components/Event/EventOptions'
import EventSearchUpcomingQuickSearch, {
  EventQuickSearchUpcomingChoice,
} from '@/Components/Event/EventSearchQuickSearchUpcoming'
import HorizontalLine from '@/Components/HorizontalLine'
import List, { ListDisplayMode, ListOptions } from '@/Components/List'
import SafeArea from '@/Components/SafeArea'
import TopOfApp from '@/Components/TopOfApp'
import ProjectFilterSort from '@/Components/Project/ProjectFilterSort'
import SearchIconButton from '@/Components/SearchIconButton'
import { navigate, RootStackParamList } from '@/Navigators/utils'
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
import Theme from '@/Theme/OldTheme'

const ClearSearchLabel = styled.Text`
  color: ${props => props.theme.colors.staBlack};
  text-align: center;
  text-decoration: underline;
  width: 100%;
`
const SearchResultsLabel = styled.Text`
  color: ${props => props.theme.colors.staBlack};
  text-align: center;
  width: 100%;
`
const SearchResultsView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
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

type Screens = {
  [key in ListType]: keyof RootStackParamList
}

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
      [ListType.Events]: 'Events',
      [ListType.Projects]: 'Projects',
    } as Screens,
    search: {
      [ListType.Events]: 'EventSearch',
      [ListType.Projects]: 'ProjectSearch',
    } as Screens,
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

  return (
    <Theme>
      <SafeArea>
        <TopOfApp />

        {params?.type && listItemsToShow ? (
          <>
            <SearchIconButton
              onPress={() => navigate(screens.search[params.type], '')}
            />

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

            <HorizontalLine />

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
          <Text>Loading...</Text>
        )}
      </SafeArea>
    </Theme>
  )
}

export default ListContainer
