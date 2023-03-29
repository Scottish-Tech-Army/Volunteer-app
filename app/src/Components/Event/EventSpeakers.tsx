/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'
import styled from 'styled-components/native'
import Entypo from 'react-native-vector-icons/Entypo'
import IconAndLabel from '@/Components/IconAndLabel'
import { EventSpeaker } from '@/Services/modules/events'
import { Linking } from 'react-native'

interface EventSpeakersProps {
  speakers: EventSpeaker[]
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
  if (!speakers) return <></>
  return (
    <>
      {speakers.map(speaker => (
        <IconAndLabel
          key={speaker.name}
          icon="user"
          text={speaker.name}
          onPress={() => Linking.openURL(speaker.url)}
        />
      ))}
    </>
  )
}

export default EventSpeakers