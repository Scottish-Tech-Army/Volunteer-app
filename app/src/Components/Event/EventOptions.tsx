// The past/upcoming/my events tabs shown at the top of the events list screen

/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { EventsRange } from '@/Services/modules/events'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'
import { navigate } from '@/Navigators/utils'

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

interface EventOptionsProps {
  selected: EventsRange | 'myEvents'
}

const EventOptions: FC<EventOptionsProps> = ({ selected }) => {
  const handleSelectedOptionChange = (
    newSelectedOption: EventsRange | 'myEvents',
  ) => {
    navigate('Events', {
      screen: 'Events',
      selectedOption: newSelectedOption,
    })
  }


  return (
    <EventOptionsView>
      <EventOptionsTouch onPress={() => handleSelectedOptionChange(EventsRange.Past)}>
        <EventOptionsText
          style={{
            fontWeight: selected === EventsRange.Past ? 'bold' : 'normal',
          }}
        >
          Past
        </EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch
        onPress={() => handleSelectedOptionChange(EventsRange.Upcoming)}
      >
        <EventOptionsText
          style={{
            fontWeight: selected === EventsRange.Upcoming ? 'bold' : 'normal',
          }}
        >
          Upcoming
        </EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText
          style={{
            fontWeight: selected === 'myEvents' ? 'bold' : 'normal',
          }}
        >
          My Events
        </EventOptionsText>
      </EventOptionsTouch>
    </EventOptionsView>
  )
}

export default EventOptions
