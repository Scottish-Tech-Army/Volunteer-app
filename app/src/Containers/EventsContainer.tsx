import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import SafeArea from '@/Components/SafeArea'
import { EventSearchInterface } from './EventSearchContainer'
import TopOfApp from '@/Components/TopOfApp'
import EventOptions from '@/Components/Event/EventOptions'
import EventReturnedList from '@/Components/Event/EventReturnedList'
import EventSearch from '@/Components/Event/EventSearch'
import EventSearchUpcomingQuickSearch from '@/Components/Event/EventSearchUpcomingQuickSearch'
import { EventsRange } from '@/Services/modules/events'
import { SafeAreaView, Text } from 'react-native'
import { setEvents } from '@/Store/Events'
import Theme from '@/Theme/OldTheme'
import {
  Events,
  useLazyFetchAllUpcomingEventsQuery,
  useLazyFetchAllPastEventsQuery
} from '@/Services/modules/events'

interface EventProps {
  data: Events
}

const HorizontalLine = styled.View`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  margin: 0px 75px 10px 75px;
`

const SearchResultsContainer = styled.View`
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

const EventsContainer = (props: {
  route: {
    params: {
      selectedOption?: EventsRange | 'myEvents'
      search: EventSearchInterface
    }
  }
}) => {
  const [
    fetchAllUpcomingEvents,
    { data: allUpcomingEvents },
  ] = useLazyFetchAllUpcomingEventsQuery()

  const [
    fetchAllPastEvents,
    { data: allPastEvents},
  ] = useLazyFetchAllPastEventsQuery()

  const dispatch = useDispatch()
  const [eventsSearch, setEventsSearch] = useState<
    EventSearchInterface | undefined
  >()
  const [selectedOption, setSelectedOption] = useState<
    EventsRange | 'myEvents'
    >(EventsRange.Upcoming)

  // When the component is first created...
  useEffect(() => {
    // Get all upcoming events from the API
    fetchAllUpcomingEvents('')
    fetchAllPastEvents('')
  }, [])

  // When allUpcomingEvents is set...
  useEffect(() => {
    // Store all upcoming events in the Redux store so they can be used by other components too e.g. EventSearchContainer
    if (allUpcomingEvents) {
      dispatch(setEvents({ upcoming: allUpcomingEvents }))
    }
  }, [allUpcomingEvents])

  // When the user changes search options or they tap Past/Upcoming/My events navigation occurs,
  // this changes the route parameters - we use this to update EventOptions and to work out
  // whether to show events search results or all events in the list
  useEffect(() => {
    setSelectedOption(
      props.route.params?.selectedOption ?? EventsRange.Upcoming,
    )
    setEventsSearch(props.route.params?.search)
  }, [props.route.params])

  const EventList: FC<EventProps> = ({ data }) => {

    
    return (
      <SafeArea>
        <TopOfApp />
        <EventSearch />
        <EventOptions selected={selectedOption} /> 

        {/* If the user has done a quick search for upcoming events, show those
            quick search buttons so they can amend their quick search if they want,
            without having to go back to the search screen */}
        {selectedOption === EventsRange.Upcoming &&
          eventsSearch?.range === EventsRange.Upcoming &&
          eventsSearch?.quickSearchChoice && (
            <SearchResultsContainer>
              <EventSearchUpcomingQuickSearch
                selectedButton={eventsSearch?.quickSearchChoice}
              />
            </SearchResultsContainer>
          )}

        {/* If the user has searched using the calendar date picker,
            show some text indicating the dates they searched for */}
        {selectedOption === EventsRange.Upcoming &&
          eventsSearch?.range === EventsRange.Upcoming &&
          eventsSearch.type === 'date' &&
          !eventsSearch?.quickSearchChoice && (
            <SearchResultsContainer>
              <SearchResultsLabel>
                Results for {eventsSearch.description}
              </SearchResultsLabel>
            </SearchResultsContainer>
          )}

        <HorizontalLine />
        <EventReturnedList data={data} eventsRange={selectedOption} />
        
      </SafeArea>
    )
  }

  const [eventsToShow, setEventsToShow] = useState<Events>() 

  useEffect (() => {
    eventToShow()
  }, [eventsSearch, allUpcomingEvents, allPastEvents, selectedOption]) 

  const eventToShow = () => {
    if (eventsSearch){ 
      setEventsToShow(eventsSearch.results)
    } else if (allUpcomingEvents && selectedOption === EventsRange.Upcoming){
      setEventsToShow(allUpcomingEvents)
    } else if (allPastEvents && selectedOption === EventsRange.Past) {
      setEventsToShow(allPastEvents)
    }
  }

  if (eventsToShow) {
    return (
      <Theme>
        <EventList data={eventsToShow} />
      </Theme>
    )
  } else {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
}

export default EventsContainer