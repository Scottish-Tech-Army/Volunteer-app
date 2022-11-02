// Events search screen container

import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import TopOfApp from '@/Components/TopOfApp'
import EventSearchCalendarPicker from '@/Components/Event/EventSearchCalendarPicker'
import EventSearchQuickSearch, {
  EventQuickSearchChoice,
} from '@/Components/Event/EventSearchQuickSearch'
import EventSearchQuickSearchUpcoming, {
  EventQuickSearchUpcomingChoice,
} from '@/Components/Event/EventSearchQuickSearchUpcoming'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { ListRouteParams, ListType } from '@/Containers/ListContainer'
import { EventsSearchField } from '@/Services/modules/events'
import { navigate } from '@/Navigators/utils'
import { Event, Events, EventsRange } from '@/Services/modules/events'
import { EventsState } from '@/Store/Events'
import { dedupeArray } from '@/Utils/Lists'
import { fuzzySearchByArray } from '@/Utils/Search'

const SectionView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
`

export interface EventSearchInterface {
  type: 'date' | 'text' // what type of search is it
  range: EventsRange // which range of events are being searched (past/upcoming/all)
  results: Events // the events results for this search
  description?: string // some text to tell the user what the search was, e.g. the date range
  quickSearchUpcomingChoice?: EventQuickSearchUpcomingChoice // upcoming date quick search (if any)
}

export const filterEventsByDate = (
  events: Events,
  filterStartDate: Date,
  filterEndDate: Date,
) =>
  events.filter(event => {
    const eventStartDate = dayjs(
      `${event.date} ${event.time}`,
      'YYYY-MM-DD HH:mm',
    )
    const eventEndDate = eventStartDate.add(event.duration, 'minute')

    // Match events where either the event start date or the event end date
    // falls within the dates the user's searching for.
    // This means we'll include multi-day events that only partly fall inside the search dates.
    return (
      (eventStartDate.isAfter(filterStartDate) &&
        eventStartDate.isBefore(filterEndDate)) ||
      (eventEndDate.isAfter(filterStartDate) &&
        eventEndDate.isBefore(filterEndDate))
    )
  })

const EventSearchContainer = () => {
  const [freeTextSearchQuery, setFreeTextSearchQuery] = useState('')
  const [calendarPickerWidth, setCalendarPickerWidth] = useState(0)

  // Get events from the Redux store (these are added to the store by the EventsContainer component)
  const allPastEvents = useSelector(
    (state: { events: EventsState }) => state.events.past,
  )
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )

  const allEvents = [...allUpcomingEvents, ...allPastEvents]

  const getQuickSearchChoices = (
    eventSearchField: EventsSearchField,
  ): EventQuickSearchChoice[] => {
    // Get all the values of what we're looking for in events
    // e.g. all series in events
    const values = allEvents
      .filter(event => Boolean(event[eventSearchField]))
      .map(event => event[eventSearchField])

    // Remove duplicate values
    const valuesUnique = dedupeArray(values)

    // Sort alphabetically
    const valuesUniqueSorted = valuesUnique.sort()

    // Convert into a quick search choice object
    return valuesUniqueSorted.map(
      value =>
        ({
          text: value,
          value: value,
        } as EventQuickSearchChoice),
    )
  }

  const handleFreeTextChange = (input: React.SetStateAction<string>) => {
    setFreeTextSearchQuery(input)
  }

  const handleFreeTextSubmit = () => {
    const results = fuzzySearchByArray(
      allEvents,
      [
        // We reduce the 'weight' (aka importance) put on the description field as it's more likely to return
        //  false positive matches because there's more general text in that field
        { name: 'description', weight: 0.5 },
        { name: 'name', weight: 1 },
        { name: 'related_initiative', weight: 1 },
        { name: 'series', weight: 1 },
      ],
      [freeTextSearchQuery],
    ) as Events

    const resultsLatestFirst = results.sort((eventA: Event, eventB: Event) => {
      const eventADate = dayjs(
        `${eventA.date} ${eventA.time}`,
        'YYYY-MM-DD HH:mm',
      )
      const eventBDate = dayjs(
        `${eventB.date} ${eventB.time}`,
        'YYYY-MM-DD HH:mm',
      )

      return eventADate.isBefore(eventBDate) ? 1 : -1
    })

    navigate('Events', {
      type: ListType.Events,
      events: {
        search: {
          type: 'text',
          range: 'all',
          results: resultsLatestFirst,
          description: `"${freeTextSearchQuery}"`,
        },
      },
    } as ListRouteParams)
  }

  const eventSeriesChoices = getQuickSearchChoices(EventsSearchField.Series)
  const relatedInitiativeChoices = getQuickSearchChoices(
    EventsSearchField.RelatedInitiative,
  )

  return (
    <SafeAreaView>
      <ScrollView
        // When we know the width of the screen, we need to tell the calendar picker what width to be
        onLayout={onLayoutEvent => {
          const { width } = onLayoutEvent.nativeEvent.layout
          setCalendarPickerWidth(width)
        }}
      >
        <TopOfApp />

        <FreeSearchBar
          handleChangeText={handleFreeTextChange}
          handleSubmit={handleFreeTextSubmit}
        />

        <SectionView>
          <EventSearchQuickSearchUpcoming />
        </SectionView>

        <SectionView>
          <EventSearchCalendarPicker width={calendarPickerWidth} />
        </SectionView>

        {Boolean(eventSeriesChoices.length) && (
          <SectionView>
            <EventSearchQuickSearch
              choices={eventSeriesChoices}
              field={EventsSearchField.Series}
              heading="Event Series"
            />
          </SectionView>
        )}

        {Boolean(relatedInitiativeChoices.length) && (
          <SectionView>
            <EventSearchQuickSearch
              choices={relatedInitiativeChoices}
              field={EventsSearchField.RelatedInitiative}
              heading="Project Specific"
            />
          </SectionView>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
