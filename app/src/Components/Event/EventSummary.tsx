/**
 * @file Short summary of an event for using in a list of events. Shows event name, image, date and time.
 */

import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventDate from './EventDate'
import EventTime from './EventTime'
import comingSoonImg from '@/Assets/Images/ComingSoon.png'
import ImageThumbnail from '@/Components/ImageThumbnail'
import Title from '@/Components/Title'
import { Event } from '@/Services/modules/events'

const EventInfo = styled.View`
  border-bottom-color: ${props => props.theme.colors.greyFaint};
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  line-height: 18px;
  min-height: 68px;
  padding: 7px 0 27px;
  width: 100%;
`
const RightColumn = styled.View`
  display: flex;
`

interface EventSummaryProps {
  event: Event
  hideDateTime?: boolean
}

/**
 * Component showing short summary of event (for use in lists)
 *
 * @param {EventSummaryProps} props The component props
 * @param {Event} props.event The event to show
 * @param {boolean} [props.hideDateTime] Should we hide the date and time
 * @returns {React.ReactElement} Component
 */
const EventSummary: FC<EventSummaryProps> = ({ event, hideDateTime }) => (
  <EventInfo key={event.id}>
    <ImageThumbnail
      image={
        event.video_thumbnail
          ? event.video_thumbnail
          : event.images.length
          ? event.images[0]
          : comingSoonImg
      }
    />
    <RightColumn>
      <Title text={event.name} type="list" />
      {!hideDateTime && (
        <>
          <EventDate date={event.date} />
          <EventTime time={event.time} />
        </>
      )}
    </RightColumn>
  </EventInfo>
)

export default EventSummary
