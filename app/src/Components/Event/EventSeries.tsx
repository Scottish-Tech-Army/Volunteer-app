// Indicator to show an event is part of a series

import React, { FC } from 'react'
import IconAndLabel from '@/Components/IconAndLabel'

interface EventSeriesProps {
  text: string
}

const EventSeries: FC<EventSeriesProps> = ({ text }) => (
  <IconAndLabel icon="layers" text={text} />
)

export default EventSeries
