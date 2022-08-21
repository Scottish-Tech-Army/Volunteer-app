/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react'
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
  onSelectedOptionChange: (newSelectedOption: EventsRange | 'myEvents') => void
}

const EventOptions: FC<EventOptionsProps> = ({ onSelectedOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState<
    EventsRange | 'myEvents'
  >(EventsRange.Upcoming)

  const handleSelectedOptionChange = (
    newSelectedOption: EventsRange | 'myEvents',
  ) => {
    setSelectedOption(newSelectedOption)
    onSelectedOptionChange(newSelectedOption) // update the parent component telling it the user has changed option
  }

  return (
    <EventOptionsView>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText
          style={{
            fontWeight: selectedOption === EventsRange.Past ? 'bold' : 'normal',
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
            fontWeight:
              selectedOption === EventsRange.Upcoming ? 'bold' : 'normal',
          }}
        >
          Upcoming
        </EventOptionsText>
      </EventOptionsTouch>
      <EventOptionsTouch onPress={underDevelopmentAlert}>
        <EventOptionsText
          style={{
            fontWeight: selectedOption === 'myEvents' ? 'bold' : 'normal',
          }}
        >
          My Events
        </EventOptionsText>
      </EventOptionsTouch>
    </EventOptionsView>
  )
}

export default EventOptions
