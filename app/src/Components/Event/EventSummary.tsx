import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventHeading from './EventHeading'
import EventDate from './EventDate'
import EventThumbnail from './EventThumbnail'
import EventTime from './EventTime'
import Feather from 'react-native-vector-icons/Feather'
import { Event } from '@/Services/modules/events'
import { navigate } from '@/Navigators/utils'

interface EventSummaryProps {
  data: Event
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

const EventSummary: FC<EventSummaryProps> = ({ data }) => (
  <EventDetails>
    <EventThumbnail />
    <RightColumn>
      <EventHeading title={data.name} />
      <EventDate
        icon={<Feather name="calendar" size={28} />}
        eventDate={new Date(data.date)}
      />
      <EventTime
        icon={<Feather name="clock" size={28} />}
        eventTime={data.time}
      />
    </RightColumn>
  </EventDetails>
)

export default EventSummary
