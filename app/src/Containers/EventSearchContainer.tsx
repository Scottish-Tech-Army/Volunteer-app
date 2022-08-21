import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { Alert, ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import CalendarPicker from 'react-native-calendar-picker'
import EventUpcomingQuickSearchButtons, {
  EventQuickSearchChoice,
} from '@/Components/Event/EventUpcomingQuickSearchButtons'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import SubmitButton from '@/Components/Forms/SubmitButton'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { Events } from '@/Services/modules/events'
import { navigate } from '@/Navigators/utils'
import { EventsState } from '@/Store/Events'

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const SectionView = styled.View`
  border-bottom-color: ${props => props.theme.colors.staBlack};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
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

    return (
      eventStartDate.isAfter(filterStartDate) &&
      eventEndDate.isBefore(filterEndDate)
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

  // Get all upcoming events from the Redux store (these are added to the store by the EventsContainer component)
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )
  const [calendarPickerWidth, setCalendarPickerWidth] = useState(0)
  const [calendarPickerStartDate, setCalendarPickerStartDate] = useState<
    Date | undefined
  >()
  const [calendarPickerEndDate, setCalendarPickerEndDate] = useState<
    Date | undefined
  >()

  const handleSearch = (input: React.SetStateAction<string>) => {
    console.log(input)
  }
  const handleSubmit = () => {
    console.log('Submit')
  }

  const handleCalendarPickerSearch = (): void => {
    if (!calendarPickerStartDate || !calendarPickerEndDate) {
      Alert.alert('Please pick a start and end date')

      return
    }

    const eventsSearchResults = filterEventsByDate(
      allUpcomingEvents,
      calendarPickerStartDate,
      calendarPickerEndDate,
    )

    navigate('Events', {
      search: {
        type: 'date',
        undefined,
        range: 'upcoming',
        results: eventsSearchResults,
        description: `${dayjs(calendarPickerStartDate).format(
          'DD/MM/YYYY',
        )} - ${dayjs(calendarPickerEndDate).format('DD/MM/YYYY')}`,
      },
    })
  }

  const onCalendarPickerChange = (date: Date, type: string) => {
    switch (type) {
      case 'START_DATE':
        setCalendarPickerStartDate(
          date ? dayjs(date).startOf('day').toDate() : undefined,
        )
        break
      case 'END_DATE':
        setCalendarPickerEndDate(
          date ? dayjs(date).endOf('day').toDate() : undefined,
        )
        break
    }
  }

  return (
    <SafeAreaView>
      <ScrollView
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
          <EventUpcomingQuickSearchButtons />
        </SectionView>

        <SectionView>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={new Date()}
            maxDate={new Date(2050, 6, 3)}
            weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
            months={[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]}
            onDateChange={onCalendarPickerChange}
            width={calendarPickerWidth}
          />
          <SubmitButton
            disabled={false}
            onPress={handleCalendarPickerSearch}
            text="Search dates"
          />
          <Label>
            Start date:{' '}
            {calendarPickerStartDate
              ? calendarPickerStartDate.toLocaleString()
              : ''}
          </Label>
          <Label>
            End date:{' '}
            {calendarPickerEndDate
              ? calendarPickerEndDate.toLocaleString()
              : ''}
          </Label>
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
