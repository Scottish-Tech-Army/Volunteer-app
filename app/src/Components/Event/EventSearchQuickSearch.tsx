/**
 * @file A group of quick search buttons for events search, reusable for different fields/values
 */

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import Title from '@/Components/Title'
import { EventSearch } from '@/Containers/EventSearchContainer'
import { ListRouteParams, ListType } from '@/Containers/ListContainer'
import { EventsSearchField } from '@/Services/modules/events'
import { navigate } from '@/Navigators/utils'
import { EventsState } from '@/Store/Events'
import { searchByArray } from '@/Utils/Search'

const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  width: 100%;
`
const ButtonTitle = styled.Text`
  display: flex;
  text-align: center;
`
const ContainerView = styled.View`
  width: 100%;
`
const TitleView = styled.View`
  margin-left: 15px;
  width: 100%;
`

export interface EventQuickSearchChoice {
  text: string // this is what is shown on the quick search button
  value: string // this is the value we actually search for -- in some cases it's the same as the text (e.g. series), in others it's different (e.g. related project)
}

interface EventSearchQuickSearchProps {
  choices: EventQuickSearchChoice[]
  field: EventsSearchField
  heading: string
}

/**
 * Events quick search button group component
 *
 * @param {EventSearchQuickSearchProps} props The component props
 * @param {EventQuickSearchChoice[]} props.choices The choices which will be used for the buttons on the quick search
 * @param {EventsSearchField} props.field The field to search on
 * @param {string} props.heading Text for the heading of this quick search group
 * @returns ReactElement Component
 */
const EventSearchQuickSearchButtons: FC<EventSearchQuickSearchProps> = ({
  choices,
  field,
  heading,
}) => {
  // Get events from the Redux store (these are added to the store by the EventsContainer component)
  const allPastEvents = useSelector(
    (state: { events: EventsState }) => state.events.past,
  )
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )

  const allEvents = [...allUpcomingEvents, ...allPastEvents]

  const handleSearch = (quickSearchChoice: string): void => {
    const eventsSearchResults = searchByArray(allEvents, field, [
      quickSearchChoice,
    ])

    navigate('Events', {
      type: ListType.Events,
      search: {
        type: 'text',
        quickSearchChoice,
        range: 'all',
        results: eventsSearchResults,
        description: `${heading.toLowerCase()} "${quickSearchChoice}"`,
      } as EventSearch,
    } as ListRouteParams)
  }

  return (
    <ContainerView>
      <TitleView>
        <Title text={heading} type="subtitle" />
      </TitleView>

      <ButtonsView>
        {choices.map((choice, index) => (
          <QuickSearchButton
            onPress={() => handleSearch(choice.value)}
            key={index}
          >
            <ButtonTitle>{choice.text}</ButtonTitle>
          </QuickSearchButton>
        ))}
      </ButtonsView>
    </ContainerView>
  )
}

export default EventSearchQuickSearchButtons
