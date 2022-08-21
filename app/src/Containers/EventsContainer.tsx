import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { EventSearchInterface } from './EventSearchContainer'
import TopOfApp from '@/Components/TopOfApp'
import EventOptions from '@/Components/Event/EventOptions'
import EventReturnedList from '@/Components/Event/EventReturnedList'
import EventSearch from '@/Components/Event/EventSearch'
import EventUpcomingQuickSearchButtons from '@/Components/Event/EventUpcomingQuickSearchButtons'
import { EventsRange } from '@/Services/modules/events'
import { SafeAreaView, Text } from 'react-native'
import { setEvents } from '@/Store/Events'
import Theme from '@/Theme/OldTheme'
import {
  Events,
  useLazyFetchAllUpcomingEventsQuery,
} from '@/Services/modules/events'

interface EventProps {
  data: Events
}

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

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
      search: EventSearchInterface
    }
  }
}) => {
  const [fetchAllUpcomingEvents, { data: allUpcomingEvents }] =
    useLazyFetchAllUpcomingEventsQuery()
  const dispatch = useDispatch()
  const eventsSearch = props.route.params?.search
  const [selectedOption, setSelectedOption] = useState<
    EventsRange | 'myEvents'
  >(EventsRange.Upcoming)

  useEffect(() => {
    // Get all upcoming events from the API
    fetchAllUpcomingEvents('')

    // Store all upcoming events in the Redux store so they can be used by other components too e.g. EventSearchContainer
    if (allUpcomingEvents) {
      dispatch(setEvents({ upcoming: allUpcomingEvents }))
    }
  }, [allUpcomingEvents, dispatch, fetchAllUpcomingEvents])

  const EventList: FC<EventProps> = ({ data }) => {
    return (
      <SafeArea>
        <TopOfApp />
        <EventSearch />
        <EventOptions
          onSelectedOptionChange={(selectedOption: EventsRange | 'myEvents') =>
            setSelectedOption(selectedOption)
          }
        />

        {/* If the user has done a quick search for upcoming events, show those
        quick search buttons so they can amend their quick search if they want */}
        {selectedOption === EventsRange.Upcoming &&
          eventsSearch?.range === EventsRange.Upcoming &&
          eventsSearch?.quickSearchChoice && (
            <SearchResultsContainer>
              <EventUpcomingQuickSearchButtons
                selectedButton={eventsSearch?.quickSearchChoice}
              />
            </SearchResultsContainer>
          )}

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
        <EventReturnedList data={data} />
      </SafeArea>
    )
  }

  if (allUpcomingEvents || eventsSearch) {
    const eventsToShow = eventsSearch
      ? eventsSearch.results
      : (allUpcomingEvents as Events)

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
