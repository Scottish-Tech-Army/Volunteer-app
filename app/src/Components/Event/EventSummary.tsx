import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventHeading from './EventHeading'
import EventDate from './EventDate'
import EventImage from './EventImage'
import EventTime from './EventTime'
import { Event } from '@/Services/modules/events'

interface EventSummaryProps {
  event: Event
}

const EventDetails = styled.TouchableOpacity`
  padding: 17px 27px 27px 27px;
  min-height: 68px;
  display: flex;
  flex-direction: row;
  line-height: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.staBlack};
  width: 100%;
`

const RightColumn = styled.View`
  display: flex;
`

const EventSummary: FC<EventSummaryProps> = ({ event }) => (
  <EventDetails key={event.id}>
    <EventImage url={event.images[0]} />
    <RightColumn>
      <EventHeading title={event.name} />
      <EventDate date={new Date(event.date)} />
      <EventTime time={event.time} />
    </RightColumn>
  </EventDetails>
)

export default EventSummary
