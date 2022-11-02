import React, { FC } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import EventSummary from './EventSummary'
import { navigate } from '@/Navigators/utils'
import { Events, EventsRange } from '@/Services/modules/events'

interface EventReturnedListProps {
  data: Events
  eventsRange: EventsRange
}

const EventListItem = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
  width: 150px;
`
const NoneFound = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`

const EventReturnedList: FC<EventReturnedListProps> = ({
  data,
  eventsRange,
}) => {
  return data.length ? (
    <FlatList
      data={data}
      keyExtractor={event => event.id}
      renderItem={({ item }) => {
        return (
          <EventListItem
            onPress={() =>
              navigate('EventDetail', { event: item, key: item.id })
            }
          >
            <EventSummary
              event={item}
              hideDateTime={eventsRange === EventsRange.Past}
            />
          </EventListItem>
        )
      }}
    />
  ) : (
    <>
      <NoneFound>Sorry, we couldn't find any events</NoneFound>
    </>
  )
}

export default EventReturnedList
