import React, { FC } from 'react'
import { EventSpeaker } from '@/Services/modules/events'

interface EventSpeakerProps {
  speakers: EventSpeaker[]
}

const EventSpeakers: FC<EventSpeakerProps> = ({ speakers }) => {
  // work out how to add map feature like in Project Skills
}

export default EventSpeakers
