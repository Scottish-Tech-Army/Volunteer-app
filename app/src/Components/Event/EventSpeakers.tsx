/**
 * @file Speakers name and LinkedIn link will be accessed in the EventSpeakers component
 */

import React, { FC } from 'react'
import styled from 'styled-components/native'
import IconAndLabel from '@/Components/IconAndLabel'
import { EventSpeaker } from '@/Services/modules/events'
import { Linking } from 'react-native'

interface EventSpeakersProps {
  speakers: EventSpeaker[]
}

const EventSpeakers: FC<EventSpeakersProps> = ({ speakers }) => {
  if (!speakers) return null
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