import React, { FC } from 'react'
import styled from 'styled-components/native'

interface EventDateProps {
  eventDate: Date
  icon: React.ReactNode
}

const DateView = styled.View`
  margin-top: 9px;
  display: flex;
  flex-direction: row;
`

const DateText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
`

const EventDate: FC<EventDateProps> = ({ eventDate, icon }) => {
  return (
    <DateView>
      {icon}
      <DateText>{eventDate.toDateString()}</DateText>
    </DateView>
  )
}

export default EventDate
