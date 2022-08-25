import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import EventSearchCalendarPicker from '@/Components/Event/EventSearchCalendarPicker'
import EventSearchUpcomingQuickSearch, {
  EventQuickSearchChoice,
} from '@/Components/Event/EventSearchUpcomingQuickSearch'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { Events } from '@/Services/modules/events'

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
  quickSearchChoice?: EventQuickSearchChoice // quick search (if any)
  range: 'past' | 'upcoming' // which range of events are being searched
  results: Events // the events results for this search
  description?: string // some text to tell the user what the search was, e.g. the date range
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
  const PopularSearches = [
    'Talk to the hiring manager',
    'Atlassian huddle',
    'Orientation',
    'Showcase',
  ]
  const ProjectSearches = [
    'Sole drop-in',
    'Volunteering app',
    'Eleos drop-in',
    'Climate change app',
  ]

  const [calendarPickerWidth, setCalendarPickerWidth] = useState(0)

  const handleSearch = (input: React.SetStateAction<string>) => {
    console.log(input)
  }

  const handleSubmit = () => {
    console.log('Submit')
  }

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
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />

        <SectionView>
          <EventSearchUpcomingQuickSearch />
        </SectionView>

        <SectionView>
          <EventSearchCalendarPicker width={calendarPickerWidth} />
        </SectionView>

        <Heading>Popular</Heading>
        <SectionView>
          {PopularSearches.map((event, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <EventTitle>{event}</EventTitle>
            </QuickSearchButton>
          ))}
        </SectionView>

        <Heading>Project Specific</Heading>
        <SectionView>
          {ProjectSearches.map((event, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <EventTitle>{event}</EventTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
