import React, { FC }  from 'react'
import styled from 'styled-components/native'

interface EventTimeProps {
    eventTime: number
}

const DateView = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-top: 9px;
`

const EventTime: FC<EventTimeProps> = ({eventTime}) => {
  return (
    <DateView>
        {eventTime}
    </DateView>
  )
}

export default EventTime