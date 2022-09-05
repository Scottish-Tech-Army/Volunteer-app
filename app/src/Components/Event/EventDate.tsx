import React, { FC } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'
import ThemeVariables from '@/Theme/Variables'

interface EventDateProps {
  date: string // YYYY-MM-DD
}

const DateView = styled.View`
  margin-right: 20px;
  margin-top: 9px;
  display: flex;
  flex-direction: row;
`

const DateText = styled.Text`
  font-weight: 600;
  font-size: ${ThemeVariables.FontSize.small}px;
  margin-left: 10px;
`

const EventDate: FC<EventDateProps> = ({ date }) => {
  return (
    <DateView>
      <Feather name="calendar" size={28} />
      <DateText>{new Date(date).toDateString()}</DateText>
    </DateView>
  )
}

export default EventDate
