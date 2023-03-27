/**
 * @file 'Today', 'This week' and 'This month' date quick search buttons for upcoming events.
 */

import React, { FC } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import {
  EventSearch,
  filterEventsByDate,
} from '@/Containers/EventSearchContainer'
import { ListRouteParams, ListType } from '@/NativeBase/Containers/ListContainer'
import { navigate } from '@/Navigators/utils'
import { EventsState } from '@/Store/Events'

const ButtonTitle = styled.Text`
  display: flex;
  text-align: center;
`

export enum EventQuickSearchUpcomingChoice {
  Today = 'Today',
  ThisWeek = 'This week',
  ThisMonth = 'This month',
}

interface EventSearchQuickSearchUpcomingProps {
  selectedButton?: EventQuickSearchUpcomingChoice | undefined
}

/**
 * Component for quick search buttons (today, this week, etc) for upcoming events
 *
 * @param {EventSearchQuickSearchUpcomingProps} props The component props
 * @param {EventQuickSearchUpcomingChoice | undefined} [props.selectedButton] Which button is selected, e.g. This week
 * @returns {React.ReactElement} Component
 */
const EventSearchQuickSearchUpcomingButtons: FC<
  EventSearchQuickSearchUpcomingProps
> = ({ selectedButton }) => {
  // Get all upcoming events from the Redux store (these are added to the store by the EventsContainer component)
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )

  const handleSearch = (
    quickSearchUpcomingChoice: EventQuickSearchUpcomingChoice,
    startDate: Date,
    endDate: Date,
  ): void => {
    if (!allUpcomingEvents)
      console.error(
        'Event search quick search upcoming - no upcoming events loaded to search through',
      )

    const eventsSearchResults = filterEventsByDate(
      allUpcomingEvents || [],
      startDate,
      endDate,
    )

    navigate('Events', {
      type: ListType.Events,
      search: {
        type: 'date',
        quickSearchUpcomingChoice,
        range: 'upcoming',
        results: eventsSearchResults,
      } as EventSearch,
    } as ListRouteParams)
  }

  return (
    <>
      <QuickSearchButton
        onPress={() =>
          handleSearch(
            EventQuickSearchUpcomingChoice.Today,
            dayjs().startOf('day').toDate(),
            dayjs().endOf('day').toDate(),
          )
        }
      >
        <ButtonTitle
          style={{
            fontWeight:
              selectedButton === EventQuickSearchUpcomingChoice.Today
                ? 'bold'
                : 'normal',
          }}
        >
          Today
        </ButtonTitle>
      </QuickSearchButton>
      <QuickSearchButton
        onPress={() =>
          handleSearch(
            EventQuickSearchUpcomingChoice.ThisWeek,
            dayjs().startOf('week').toDate(),
            dayjs().endOf('week').toDate(),
          )
        }
      >
        <ButtonTitle
          style={{
            fontWeight:
              selectedButton === EventQuickSearchUpcomingChoice.ThisWeek
                ? 'bold'
                : 'normal',
          }}
        >
          This week
        </ButtonTitle>
      </QuickSearchButton>
      <QuickSearchButton
        onPress={() =>
          handleSearch(
            EventQuickSearchUpcomingChoice.ThisMonth,
            dayjs().startOf('month').toDate(),
            dayjs().endOf('month').toDate(),
          )
        }
      >
        <ButtonTitle
          style={{
            fontWeight:
              selectedButton === EventQuickSearchUpcomingChoice.ThisMonth
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

export default EventSearchQuickSearchUpcomingButtons
