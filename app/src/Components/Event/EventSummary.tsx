import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventHeading from './EventHeading'
import EventDate from './EventDate'
import EventThumbnail from './EventThumbnail'
import EventTime from './EventTime'
import { Events } from './types'

interface EventSummaryProps {
  data: Events
}

const EventDetails = styled.TouchableOpacity`
  margin: 21px 41px 0px 21px;
  padding: 17px 27px 11px 27px;
  min-height: 68px;
  display: flex;
  line-height: 18px;
`

const EventSummary: FC<EventSummaryProps> = ({ data }) => {
  const eventList = data.map((event, index) => {
    return (
        <EventDetails key={index}>
          <EventThumbnail />
          <EventHeading title={event.fields["Event Name"]} />
          <EventDate eventDate={new Date(event.fields["Event Date"])} />
          <EventTime eventDate={new Date(event.fields["Event Date"])} />
        </EventDetails>
    )
  })

  return <>{eventList}</>
}

export default EventSummary
