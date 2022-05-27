import React, { FC } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

interface EventTimeProps {
  time: string
}

const TimeView = styled.View`
  margin-top: 9px;
  display: flex;
  flex-direction: row;
`

const TimeText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
`

const EventTime: FC<EventTimeProps> = ({ time }) => {
  return (
    <TimeView>
      <Feather name="clock" size={28} />
      <TimeText>{time}</TimeText>
    </TimeView>
  )
}

export default EventTime
