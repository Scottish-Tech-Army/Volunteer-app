import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import EventSearchCalendarPicker from '@/Components/Event/EventSearchCalendarPicker'
import EventSearchQuickSearch, {
  EventQuickSearchChoice,
} from '@/Components/Event/EventSearchQuickSearch'
import EventSearchQuickSearchUpcoming, {
  EventQuickSearchUpcomingChoice,
} from '@/Components/Event/EventSearchQuickSearchUpcoming'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { Events } from '@/Services/modules/events'
import { EventsState } from '@/Store/Events'
import { fuzzySearchByArray } from '@/Utils/Search'

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const SectionView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0;
`
const Label = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin: 15px 15px 0px 15px;
`
const EventTitle = styled.Text`
  display: flex;
  text-align: center;
`

export interface EventSearchInterface {
  type: 'date' | 'text' // what type of search is it
  range: 'all' | 'past' | 'upcoming' // which range of events are being searched
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
  const [calendarPickerWidth, setCalendarPickerWidth] = useState(0)

  // Get all upcoming events from the Redux store (these are added to the store by the EventsContainer component)
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )

  // TODO: when past events are also being brought into the app, change the line below
  // to combine allUpcomingEvents and past events e.g. const allEvents = [...allUpcomingEvents, ...allPastEvents]
  const allEvents = [...allUpcomingEvents]

  const getEventsSeriesChoices = (): EventQuickSearchChoice[] => {
    const eventsSeriesChoices = [] as EventQuickSearchChoice[]

    for (const event of allEvents) {
      if (
        event.series &&
        !eventsSeriesChoices.some(choice => choice.value === event.series)
      )
        eventsSeriesChoices.push({
          text: event.series,
          value: event.series,
        })
    }

    eventsSeriesChoices.sort()

    return eventsSeriesChoices
  }

  const handleFreeTextChange = (input: React.SetStateAction<string>) => {
    console.log(input)
  }

  const handleFreeTextSubmit = () => {
    console.log('Submit')
  }

  // Define options for quick search buttons
  const eventsSeriesChoices = getEventsSeriesChoices()

  const ProjectSearches = [
    'Sole drop-in',
    'Volunteering app',
    'Eleos drop-in',
    'Climate change app',
  ]

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

        <SectionView>
          <EventSearchQuickSearch
            choices={eventsSeriesChoices}
            field="series"
            heading="Series"
          />
        </SectionView>

        <SectionView>
          {/*
            TODO:
            - Database: add project_res_id field to event
            - API: add project_res_id to all events data
            - API: update tests to include project_res_id
            - App: get project specific quick search working
            - App: get free text search working
          */}
          <EventSearchQuickSearch
            choices={eventsSeriesChoices}
            field="series"
            heading="Project Specific"
          />
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
