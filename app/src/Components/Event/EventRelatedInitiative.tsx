// Indicator to show an event is related to an initiative (e.g. an STA project)

import React, { FC } from 'react'
import IconAndLabel from '@/Components/IconAndLabel'

interface EventRelatedInitiativeProps {
  text: string
}

const EventRelatedInitiative: FC<EventRelatedInitiativeProps> = ({ text }) => (
  <IconAndLabel icon="tool" text={text} />
)

export default EventRelatedInitiative
