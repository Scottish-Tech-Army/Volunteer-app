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
  const clickUpcomingEvents = () => {
    setSelectedOption('upcoming')
  }
  return (
    <EventOptionsView>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText
          style={{
            fontWeight: selectedOption === 'past' ? 'bold' : 'normal',
          }}
        >
          Past
        </EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={clickUpcomingEvents}>
        <EventOptionsText
          style={{
            fontWeight: selectedOption === 'upcoming' ? 'bold' : 'normal',
          }}
        >
          Upcoming
        </EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText
          style={{
            fontWeight: selectedOption === 'my' ? 'bold' : 'normal',
          }}
        >
          My Events
        </EventOptionsText>
      </EventOptionsTouch>
    </EventOptionsView>
  )
}

export default EventOptions
