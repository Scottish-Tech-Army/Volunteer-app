import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventDate from './EventDate'
import EventImage from '../ImageThumbnail'
import EventTime from './EventTime'
import Title from '../Title'
import { Event } from '@/Services/modules/events'
import { ScrollView } from 'react-native-gesture-handler'

interface EventDetailsProps {
  event: Event
}

const EventDetailsView = styled.View`
  margin: 21px 27px 0px 27px;
`

const EventDescription = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin-top: 4px;
`

// TODO: description -- allow HTML
// TODO: images -- fit to size
// TODO: images -- show multiple

const EventDetails: FC<EventDetailsProps> = ({ event }) => {
  return (
    <ScrollView>
      <EventDetailsView>
        <Title text={event.name} type="main" />
        <EventDate date={event.date} />
        <EventTime time={event.time} />
        <EventImage image={event.images[0]} />
        <EventDescription>{event.description}</EventDescription>
      </EventDetailsView>
    </ScrollView>
  )
}

export default EventDetails
