import React, { FC, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { EventSearchInterface } from './EventSearchContainer'
import EventOptions from '@/Components/Event/EventOptions'
import EventReturnedList from '@/Components/Event/EventReturnedList'
import EventSearchUpcomingQuickSearch from '@/Components/Event/EventSearchQuickSearchUpcoming'
import HorizontalLine from '@/Components/HorizontalLine'
import SafeArea from '@/Components/SafeArea'
import TopOfApp from '@/Components/TopOfApp'
import ProjectOptions from '@/Components/Project/ProjectOptions'
import ProjectReturnedList from '@/Components/Project/ProjectReturnedList'
import List, { ListOptions } from '@/Components/List'
import SearchIconButton from '@/Components/SearchIconButton'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import {
  Event,
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
import { setEvents } from '@/Store/Events'
import { setProjects } from '@/Store/Projects'
import Theme from '@/Theme/OldTheme'

export enum ListType {
  Events = 'events',
  Projects = 'projects',
}

interface ListRouteParams {
  type: ListType
  events?: {
    selectedOption?: EventsRange
    search?: EventSearchInterface
  }
}

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

const ListContainer = (props: {
  route: {
    params: ListRouteParams
  }
}) => {
  const params = props.route.params

  // Common variables
  const dispatch = useDispatch()
  const [isSearchResults, setIsSearchResults] = useState(false)
  const [listItemsToShow, setListItemsToShow] = useState<Events | Projects>()
  const [listOptions, setListOptions] = useState<ListOptions>()
  const [searchDestination, setSearchDestination] =
    useState<keyof RootStackParamList>()

  // Events variables
  const [fetchAllUpcomingEvents, { data: allUpcomingEvents }] =
    useLazyFetchAllUpcomingEventsQuery()
  const [fetchAllPastEvents, { data: allPastEvents }] =
    useLazyFetchAllPastEventsQuery()
  const [eventsSearch, setEventsSearch] = useState<
    EventSearchInterface | undefined
  >()
  const [eventsSelectedOption, setEventsSelectedOption] = useState<EventsRange>(
    EventsRange.Upcoming,
  )

  // Projects variables
  const [fetchAllProjects, { data: allProjects }] =
    useLazyFetchAllProjectsQuery()

  /*
   *
   * General logic and functionality
   *
   */

  // Set options based on which type of data we're showing in the list
  useEffect(() => {
    switch (params.type) {
      case ListType.Events:
        setSearchDestination('EventSearch')
        break
      case ListType.Projects:
        setSearchDestination('ProjectSearch')
        break
    }
  }, [params.type])

  // When the container is first created, get data from the API
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
  }, [])

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
  }, [allUpcomingEvents, allPastEvents, allProjects])

  // Set which data to show in the list
  useEffect(() => {
    switch (params.type) {
      case ListType.Events:
        if (eventsSearch) {
          setListItemsToShow(eventsSearch.results)
        } else if (
          allUpcomingEvents &&
          eventsSelectedOption === EventsRange.Upcoming
        ) {
          setListItemsToShow(allUpcomingEvents)
        } else if (allPastEvents && eventsSelectedOption === EventsRange.Past) {
          setListItemsToShow(allPastEvents)
        }
        break

      case ListType.Projects:
        setListItemsToShow(allProjects)
        break
    }
  }, [
    params.type,
    eventsSearch,
    allUpcomingEvents,
    allPastEvents,
    eventsSelectedOption,
  ])

  // Determine whether the user's seeing everything, or search results
  useEffect(() => {
    switch (params.type) {
      case ListType.Events:
        setIsSearchResults(Boolean(params.events?.search))
        break

      case ListType.Projects:
        // setIsSearchResults(Boolean(params.projects?.search)) // TODO
        break
    }
  }, [params.type, params.events?.search])

  // Set options to send to List component
  useEffect(() => {
    switch (params.type) {
      case ListType.Events:
        setListOptions({
          events: {
            range: eventsSelectedOption,
          },
        })
        break

      case ListType.Projects:
        setListOptions({}) // TODO
        break
    }
  }, [params.type, eventsSelectedOption])

  /*
   *
   * Events logic
   *
   */

  // When the user changes search options or they tap Past/Upcoming/My events navigation occurs,
  // this changes the route parameters - we use this to update EventOptions and to work out
  // whether to show events search results or all events in the list
  useEffect(() => {
    setEventsSelectedOption(
      params?.events?.selectedOption ??
        params?.events?.search?.range ??
        EventsRange.Upcoming,
    )
    setEventsSearch(params?.events?.search)
  }, [params?.events])

  /*
   *
   * Projects logic
   *
   */

  // TODO

  return (
    <Theme>
      <SafeArea>
        <TopOfApp />

        {listItemsToShow !== undefined && listOptions ? (
          <>
            {searchDestination !== undefined && (
              <SearchIconButton
                onPress={() => navigate(searchDestination, '')}
              />
            )}

            <EventOptions selected={eventsSelectedOption} />

            {/* If the user has done a quick search for upcoming events, show those
          quick search buttons so they can amend their quick search if they want,
          without having to go back to the search screen
          TODO: update to include projects search */}
            {eventsSelectedOption === EventsRange.Upcoming &&
              eventsSearch?.range === EventsRange.Upcoming &&
              eventsSearch?.quickSearchUpcomingChoice && (
                <SearchResultsView>
                  <EventSearchUpcomingQuickSearch
                    selectedButton={eventsSearch?.quickSearchUpcomingChoice}
                  />
                </SearchResultsView>
              )}

            {/* If the user has searched, show some text indicating what they searched for 
            TODO: update to include projects search */}
            {Boolean(eventsSearch?.description) && (
              <SearchResultsView>
                <SearchResultsLabel>
                  Results for {eventsSearch?.description}
                </SearchResultsLabel>
              </SearchResultsView>
            )}

            <HorizontalLine />

            <List
              data={listItemsToShow}
              mode={isSearchResults ? 'search' : 'fullList'}
              options={listOptions}
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
