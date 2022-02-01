import React, { FC }  from 'react'
import styled from 'styled-components/native'

interface EventTimeProps {
    eventTime: number
    icon: React.ReactNode
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

const EventTime: FC<EventTimeProps> = ({eventTime, icon}) => {
  return (
    <TimeView>
        {icon}
        <TimeText>{eventTime}</TimeText>
    </TimeView>
  )
}

export default EventTime