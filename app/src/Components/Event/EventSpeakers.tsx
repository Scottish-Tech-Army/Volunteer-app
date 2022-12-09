import React, { FC } from 'react'
import styled from 'styled-components/native'
import Entypo from 'react-native-vector-icons/Entypo'

interface EventSpeakersProps {
  speakers: string[]
}

const SpeakersView = styled.View`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.staBlack};
  `

const SpeakerText = styled.Text`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  font-size: 10px;
  border-radius: 4px;
  margin-left: 8.5px;
  padding: 0px 1px 0px 2px;
`

const EventSpeakers: FC<EventSpeakersProps> = ({ speakers }) => {
  return (
    <>
      {speakers.map(speaker => (
        <SpeakersView key={speaker}>
          <Entypo name="person-circle-outline" size={16} />
          <SpeakerText>{speaker}</SpeakerText>
        </SpeakersView>
      ))}
    </>
  )
}

export default EventSpeakers
