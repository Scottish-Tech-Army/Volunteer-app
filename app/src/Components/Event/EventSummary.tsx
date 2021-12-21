import React, { FC } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Events } from './types'

interface EventSummaryProps {
  data: Events
}

const EventDetails = styled.TouchableOpacity`
  margin: 21px 41px 0px 21px;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  padding: 17px 27px 11px 27px;
`

const EventSummary: FC<EventSummaryProps> = ({ data }) => {
  const eventList = data.map((event, index) => {
    return (
        <EventDetails key={index}>
            <Text>{event.name}</Text>
        </EventDetails>
    )
  })

  return <>{eventList}</>
}

export default EventSummary
