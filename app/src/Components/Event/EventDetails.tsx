// Event details screen to show a single event -- all details, video/images, etc

import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Markdown from 'react-native-simple-markdown'
import styled from 'styled-components/native'
import comingSoonImg from '@/Assets/Images/ComingSoon.png'
import { Event } from '@/Services/modules/events'
import ThemeVariables from '@/Theme/Variables'
import EventSeries from './EventSeries'
import EventDate from './EventDate'
import EventTime from './EventTime'
import ImageFullWidth from '../ImageFullWidth'
import ImageSwiper from '../ImageSwiper'
import Title from '../Title'
import Video from '../Video'

interface EventDetailsProps {
  event: Event
}

const EventTopInfo = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 10px 0 30px;
`
const EventDateTime = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`
const EventDescription = styled.View`
  margin-top: 50px;
`
const EventDescriptionMarkdownStyles = {
  text: {
    fontSize: ThemeVariables.FontSize.regular,
  },
}
const EventDetailsView = styled.View`
  margin: 21px 27px 0px 27px;
`

const EventDetails: FC<EventDetailsProps> = ({ event }) => {
  return (
    <ScrollView>
      <EventDetailsView>
        <Title text={event.name} type="main" />

        <EventTopInfo>
          <EventDateTime>
            <EventDate date={event.date} />
            <EventTime time={event.time} />
          </EventDateTime>

          {event.series ? <EventSeries text={event.series} /> : null}
        </EventTopInfo>

        {/* If there's a video, show this.  Otherwise, show event image(s) if there are any, or the 'coming soon' image. */}
        {event.video_file ? (
          <Video url={event.video_file} />
        ) : event.images.length > 1 ? (
          <ImageSwiper images={event.images} />
        ) : (
          <ImageFullWidth
            image={event.images.length ? event.images[0] : comingSoonImg}
          />
        )}

        <EventDescription>
          {/* Event description can contain markdown code for formatting e.g. bold, links, etc.
              (For info on markdown in general see https://www.markdownguide.org/getting-started/) */}
          <Markdown styles={EventDescriptionMarkdownStyles}>
            {event.description}
          </Markdown>
        </EventDescription>
      </EventDetailsView>
    </ScrollView>
  )
}

export default EventDetails
