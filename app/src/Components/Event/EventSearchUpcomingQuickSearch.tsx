// 'Today', 'This week' and 'This month' date quick search buttons for upcoming events

import React, { FC } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import { filterEventsByDate } from '@/Containers/EventSearchContainer'
import { navigate } from '@/Navigators/utils'
import { EventsState } from '@/Store/Events'

export enum EventQuickSearchChoice {
  Today = 'Today',
  ThisWeek = 'This week',
  ThisMonth = 'This month',
}

interface EventSearchUpcomingQuickSearchProps {
  selectedButton?: EventQuickSearchChoice | undefined
}

const ButtonTitle = styled.Text`
  display: flex;
  text-align: center;
`

const EventSearchUpcomingQuickSearchButtons: FC<
  EventSearchUpcomingQuickSearchProps
> = ({ selectedButton }) => {
  // Get all upcoming events from the Redux store (these are added to the store by the EventsContainer component)
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )

  const handleDateQuickSearch = (
    quickSearchChoice: EventQuickSearchChoice,
    quickSearchStartDate: Date,
    quickSearchEndDate: Date,
  ): void => {
    const eventsSearchResults = filterEventsByDate(
      allUpcomingEvents,
      quickSearchStartDate,
      quickSearchEndDate,
    )

    navigate('Events', {
      search: {
        type: 'date',
        quickSearchChoice,
        range: 'upcoming',
        results: eventsSearchResults,
      },
    })
  }

  return (
    <>
      <QuickSearchButton
        onPress={() =>
          handleDateQuickSearch(
            EventQuickSearchChoice.Today,
            dayjs().startOf('day').toDate(),
            dayjs().endOf('day').toDate(),
          )
        }
      >
        <ButtonTitle
          style={{
            fontWeight:
              selectedButton === EventQuickSearchChoice.Today
                ? 'bold'
                : 'normal',
          }}
        >
          Today
        </ButtonTitle>
      </QuickSearchButton>
      <QuickSearchButton
        onPress={() =>
          handleDateQuickSearch(
            EventQuickSearchChoice.ThisWeek,
            dayjs().startOf('week').toDate(),
            dayjs().endOf('week').toDate(),
          )
        }
      >
        <ButtonTitle
          style={{
            fontWeight:
              selectedButton === EventQuickSearchChoice.ThisWeek
                ? 'bold'
                : 'normal',
          }}
        >
          This week
        </ButtonTitle>
      </QuickSearchButton>
      <QuickSearchButton
        onPress={() =>
          handleDateQuickSearch(
            EventQuickSearchChoice.ThisMonth,
            dayjs().startOf('month').toDate(),
            dayjs().endOf('month').toDate(),
          )
        }
      >
        <ButtonTitle
          style={{
            fontWeight:
              selectedButton === EventQuickSearchChoice.ThisMonth
                ? 'bold'
                : 'normal',
          }}
        >
          This month
        </ButtonTitle>
      </QuickSearchButton>
    </>
  )
}

export default EventSearchUpcomingQuickSearchButtons
