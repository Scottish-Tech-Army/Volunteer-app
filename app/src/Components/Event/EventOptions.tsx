/* eslint-disable react-native/no-inline-styles */
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
    setSelectedOption('my')
    underDevelopmentAlert
  }
  return (
    <EventOptionsView>
      <EventOptionsTouch
        style={{
          backgroundColor: selectedOption === 'past' ? 'blue' : 'red',
        }}
        onPress={underDevelopmentAlert}
      >
        <EventOptionsText>Past</EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch
        style={{
          backgroundColor: selectedOption === 'upcoming' ? 'blue' : 'red',
        }}
        onPress={clickUpcomingEvents}
      >
        <EventOptionsText>Upcoming</EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch
        style={{
          backgroundColor: selectedOption === 'my' ? 'blue' : 'red',
        }}
        onPress={underDevelopmentAlert}
      >
        <EventOptionsText>My Events</EventOptionsText>
      </EventOptionsTouch>
    </EventOptionsView>
  )
}

export default EventOptions
