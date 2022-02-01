import React, { FC }  from 'react'
import styled from 'styled-components/native'
import { ImageComponent } from 'react-native'

interface EventTimeProps {
    eventDate: Date
}

const DateView = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-top: 9px;
`

const EventTime: FC<EventTimeProps> = ({eventDate}) => {
  return (
    <DateView>
        {eventDate.toDateString()}
    </DateView>
  )
}

export default EventTime