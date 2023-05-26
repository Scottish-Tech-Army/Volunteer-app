import React, { FC } from 'react'
import IconAndLabel from '@/Components/IconAndLabel'

interface EventTimeProps {
  time: string
}

const EventTime: FC<EventTimeProps> = ({ time }) => (
  <IconAndLabel icon="clock" text={time} />
)

export default EventTime
