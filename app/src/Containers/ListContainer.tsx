/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { EventSearch } from './EventSearchContainer'
import { ProjectSearch } from './ProjectSearchContainer'
import EventOptions from '@/Components/Event/EventOptions'
import EventSearchUpcomingQuickSearch, {
  EventQuickSearchUpcomingChoice,
} from '@/Components/Event/EventSearchQuickSearchUpcoming'
import HorizontalLine from '@/Components/HorizontalLine'
import SafeArea from '@/Components/SafeArea'
import TopOfApp from '@/Components/TopOfApp'
import ProjectFilterSort from '@/Components/Project/ProjectFilterSort'
import List, { ListOptions } from '@/Components/List'
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
import { setEvents } from '@/Store/Events'
import { setProjects } from '@/Store/Projects'
import Theme from '@/Theme/OldTheme'

const SearchResultsView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
`

const SearchResultsLabel = styled.Text`
  color: ${props => props.theme.colors.staBlack};
  text-align: center;
  width: 100%;
`

const ClearSearchLabel = styled.Text`
  color: ${props => props.theme.colors.staBlack};
  text-align: center;
  text-decoration: underline;
  width: 100%;
`

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

  // General
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
  const [fetchAllUpcomingEvents, { data: allUpcomingEvents }] =
    useLazyFetchAllUpcomingEventsQuery()
  const [fetchAllPastEvents, { data: allPastEvents }] =
    useLazyFetchAllPastEventsQuery()
  const [eventsSelectedOption, setEventsSelectedOption] = useState<EventsRange>(
    EventsRange.Upcoming,
  )
  const [eventsShowUpcomingQuickSearch, setEventsShowUpcomingQuickSearch] =
    useState(false)
  const [eventsQuickSearchUpcomingChoice, setEventsQuickSearchUpcomingChoice] =
    useState<EventQuickSearchUpcomingChoice | undefined>()

  // Projects-specific
  const [fetchAllProjects, { data: allProjects }] =
    useLazyFetchAllProjectsQuery()

  /*
   *
   * General logic
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
    if (allUpcomingEvents) {
      dispatch(setEvents({ upcoming: allUpcomingEvents }))
    }
    if (allPastEvents) {
      dispatch(setEvents({ past: allPastEvents }))
    }
    if (allProjects) {
      dispatch(setProjects(allProjects))
    }
  }, [allUpcomingEvents, allPastEvents, allProjects, dispatch])

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
      // then show it here too so they can change to one of these other quick search options directly
      // on the search results screen in if they want to
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

            {/* Projects filter & sort */}
            {params.type === ListType.Projects &&
              Boolean(params?.search) &&
              Boolean(listItemsToShow.length) && <ProjectFilterSort />}

            <HorizontalLine />

            <List
              data={listItemsToShow}
              mode={params?.search ? 'search' : 'fullList'}
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
