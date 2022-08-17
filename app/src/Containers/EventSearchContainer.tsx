import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import CalendarPicker from 'react-native-calendar-picker'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { navigate } from '@/Navigators/utils'
import { EventsState } from '@/Store/Events'
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

  const [allUpcomingEvents, setAllUpcomingEvents] = useState<Events>([])
  const [calendarPickerWidth, setCalendarPickerWidth] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    // When the component first loads, get all upcoming events from the Redux store (these are stored by the EventsContainer component)
    const allUpcomingEventsFromStore = useSelector((state: {events: EventsState}) =>
      state.events.upcoming
    )
    setAllUpcomingEvents(allUpcomingEventsFromStore)
  }, [])

  const handleSearch = (input: React.SetStateAction<string>) => {
    console.log(input)
  }
  const handleSubmit = () => {
    console.log('Submit')
  }

  const handleDateQuickSearch = (quickSearchStartDate: Date, quickSearchEndDate: Date) => {
    const eventsSearchResults = filterEventsByDate(quickSearchStartDate, quickSearchEndDate)

    navigate('Events', { eventsSearchResults })
  }

  const filterEventsByDate = (filterStartDate: Date, filterEndDate: Date) =>
    allUpcomingEvents.filter(event => {
      const eventStartDate = dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm')
      const eventEndDate = eventStartDate.add(event.duration, 'minute')

      return eventStartDate.isAfter(filterStartDate) && eventEndDate.isBefore(filterEndDate)
    })

  const onDateChange = (date: Date, type: string) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setEndDate(date)
    } else {
      setEndDate(date)
      setStartDate(date)
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
          <QuickSearchButton onPress={() => handleDateQuickSearch(dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate())}>
            <EventTitle>Today</EventTitle>
          </QuickSearchButton>
          <QuickSearchButton onPress={() => handleDateQuickSearch(dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate())}>
            <EventTitle>This week</EventTitle>
          </QuickSearchButton>
          <QuickSearchButton onPress={() => handleDateQuickSearch(dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate())}>
            <EventTitle>This month</EventTitle>
          </QuickSearchButton>
        </SectionView>
        <CalendarPicker
          selectedStartDate={startDate}
          selectedEndDate={endDate}
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
          onDateChange={onDateChange}
          width={calendarPickerWidth}
        />
        <Label>Start date: {startDate ? startDate.toLocaleString() : ''}</Label>
        <Label>End date: {endDate ? endDate.toLocaleString() : ''}</Label>
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
