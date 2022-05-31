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

const EventOptions = () => {
  return (
    <EventOptionsView>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText>Past</EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText>Upcoming</EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText>My Events</EventOptionsText>
      </EventOptionsTouch>
    </EventOptionsView>
  )
}

export default EventOptions
