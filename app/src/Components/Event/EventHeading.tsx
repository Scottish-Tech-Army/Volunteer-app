import React, { FC } from 'react'
import styled from 'styled-components/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface EventHeadingProps {
  title: string
}

const EventHeadingView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EventTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
`

const EventHeading: FC<EventHeadingProps> = ({ title }) => {
  return (
    <EventHeadingView>
      <EventTitle>{title}</EventTitle>
    </EventHeadingView>
  )
}

export default EventHeading
