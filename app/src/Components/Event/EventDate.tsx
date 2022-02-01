import React, { FC }  from 'react'
import styled from 'styled-components/native'
import Feather from 'react-native-vector-icons/Feather'

interface EventDateProps {
    eventDate: Date
}

const DateView = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-top: 9px;
`

const EventDate: FC<EventDateProps> = ({eventDate}) => {
  return (
    <DateView>
      {eventDate.toDateString()}
    </DateView>
  )
}

export default EventDate