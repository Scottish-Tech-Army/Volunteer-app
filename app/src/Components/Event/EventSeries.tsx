// Indicator to show an event is part of a series

import React, { FC } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'
import ThemeVariables from '@/Theme/Variables'

interface EventSeriesProps {
  text: string
}

const EventSeriesView = styled.View`
  display: flex;
  flex-direction: row;
`
const EventSeriesText = styled.Text`
  font-size: ${ThemeVariables.FontSize.small}px;
  font-weight: 600;
  margin-left: 10px;
`

const EventSeries: FC<EventSeriesProps> = ({ text }) => {
  return (
    <EventSeriesView>
      <Feather name="layers" size={28} />
      <EventSeriesText>{text}</EventSeriesText>
    </EventSeriesView>
  )
}

export default EventSeries
