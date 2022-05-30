import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Markdown from 'react-native-simple-markdown'
import styled from 'styled-components/native'
import EventDate from './EventDate'
import ImageLarge from '../ImageLarge'
import ImageSwiper from '../ImageSwiper'
import EventTime from './EventTime'
import Title from '../Title'
import comingSoonImg from '@/Assets/Images/ComingSoon.png'
import { Event } from '@/Services/modules/events'
import ThemeVariables from '@/Theme/Variables'

interface EventDetailsProps {
  event: Event
}

const EventDateTime = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 10px 0 25px;
`
const EventDescription = styled.View`
  margin-top: 20px;
`
const EventDescriptionMarkdownStyles = {
  text: {
    fontSize: ThemeVariables.FontSize.regular,
  },
}
const EventDetailsView = styled.View`
  margin: 21px 27px 0px 27px;
`

// TODO: video -- show in place of image if exists

const EventDetails: FC<EventDetailsProps> = ({ event }) => {
  return (
    <ScrollView>
      <EventDetailsView>
        <Title text={event.name} type="main" />

        <EventDateTime>
          <EventDate date={event.date} />
          <EventTime time={event.time} />
        </EventDateTime>

        {event.images.length <= 1 ? (
          <ImageLarge
            image={event.images.length ? event.images[0] : comingSoonImg}
          />
        ) : (
          <ImageSwiper images={event.images} />
        )}

        <EventDescription>
          <Markdown styles={EventDescriptionMarkdownStyles}>
            {event.description}
          </Markdown>
        </EventDescription>
      </EventDetailsView>
    </ScrollView>
  )
}

export default EventDetails
