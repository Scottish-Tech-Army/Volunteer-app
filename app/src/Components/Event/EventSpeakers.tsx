import React, { FC } from 'react'

// need to fetch data from somewhere here ie., import data from

interface EventSpeakerProps {
  speaker_name: string
  linkedin_url: string
}

const EventSpeakers: FC<EventSpeakerProps> = ({
  speaker_name,
  linkedin_url,
}) => {
  // what goes here
}

export default EventSpeakers
