import React, { FC } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import EventSummary from './EventSummary'
import { Events } from '@/Services/modules/events'

interface EventReturnedListProps {
  data: Events
}

const EventDetails = styled.TouchableOpacity`
  margin: 21px 21px 0px 21px;
`
const NoneFound = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`

const EventReturnedList: FC<EventReturnedListProps> = ({ data }) => {
  return data.length ? (
    <FlatList
      data={data}
      keyExtractor={event => event.id}
      renderItem={({ item }) => {
        return (
          <EventDetails>
            <EventSummary data={item} />
          </EventDetails>
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
