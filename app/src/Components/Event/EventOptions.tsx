import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'

const EventOptionsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 23px 10px;
`

const EventOptionsText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

const EventOptionsTouch = styled.TouchableOpacity``

function EventOptions() {
  const [selectedOption, setSelectedOption] = React.useState('upcoming')
  const clickPastEvents = () => {
    setSelectedOption('past')
  }
  const clickUpcomingEvents = () => {
    setSelectedOption('upcoming')
  }
  const clickMyEvents = () => {
    setSelectedOption('popular')
    underDevelopmentAlert
  }
  return (
    <EventOptionsView>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText>Past</EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={clickUpcomingEvents}>
        <EventOptionsText>Upcoming</EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText>My Events</EventOptionsText>
      </EventOptionsTouch>
    </EventOptionsView>
  )
}

export default EventOptions
