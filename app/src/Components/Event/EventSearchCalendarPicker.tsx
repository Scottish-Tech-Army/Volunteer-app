// Calendar picker for events searching, the user can choose start and end dates

import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import CalendarPicker from 'react-native-calendar-picker' // Note: this package also requires 'moment' package to be installed
import { EventSearchInterface } from '@/Containers/EventSearchContainer'
import SubmitButton from '@/Components/Forms/SubmitButton'
import { filterEventsByDate } from '@/Containers/EventSearchContainer'
import { ListRouteParams, ListType } from '@/Containers/ListContainer'
import { navigate } from '@/Navigators/utils'
import { EventsState } from '@/Store/Events'

interface EventSearchCalendarPickerProps {
  width?: number
}

const EventSearchCalendarPicker: FC<EventSearchCalendarPickerProps> = ({
  width,
}) => {
  // Get all upcoming events from the Redux store (these are added to the store by the EventsContainer component)
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const handleSubmit = (): void => {
    if (!startDate || !endDate) {
      Alert.alert('Please pick a start and end date')

      return
    }

    const eventsSearchResults = filterEventsByDate(
      allUpcomingEvents,
      startDate,
      endDate,
    )

    const startDateString = dayjs(startDate).format('DD/MM/YYYY')
    const endDateString = dayjs(endDate).format('DD/MM/YYYY')
    const description =
      startDateString === endDateString
        ? startDateString
        : `${startDateString} - ${endDateString}`

    navigate('Events', {
      type: ListType.Events,
      events: {
        search: {
          type: 'date',
          range: 'upcoming',
          results: eventsSearchResults,
          description,
        },
      },
    } as ListRouteParams)
  }

  const onDateChange = (date: Date, type: string) => {
    switch (type) {
      case 'START_DATE':
        setStartDate(date ? dayjs(date).startOf('day').toDate() : undefined)
        break
      case 'END_DATE':
        setEndDate(date ? dayjs(date).endOf('day').toDate() : undefined)
        break
    }
  }

  return (
    <>
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
        onDateChange={onDateChange}
        width={width}
      />
      <SubmitButton
        disabled={false}
        onPress={handleSubmit}
        text="Search dates"
      />
    </>
  )
}

export default EventSearchCalendarPicker
