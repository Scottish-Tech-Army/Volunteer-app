import React, { FC } from 'react'
import IconAndLabel from '@/Components/IconAndLabel'

interface EventDateProps {
  date: string // YYYY-MM-DD
}

const EventDate: FC<EventDateProps> = ({ date }) => (
  <IconAndLabel icon="calendar" text={new Date(date).toDateString()} />
)

export default EventDate
