import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventHeading from './EventHeading'
import EventDate from './EventDate'
import EventThumbnail from './EventThumbnail'
import EventTime from './EventTime'
import Feather from 'react-native-vector-icons/Feather'
import { Events } from './types'

interface EventSummaryProps {
  data: Events
}

const EventDetails = styled.TouchableOpacity`
  margin: 21px 41px 0px 21px;
  padding: 17px 27px 11px 27px;
  min-height: 68px;
  display: flex;
  flex-direction: row;
  line-height: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.staBlack};
`

const RightColumn = styled.View`
  display: flex;
`


const EventSummary: FC<EventSummaryProps> = ({ data }) => {
  const eventList = data.map((event, index) => {
    return (
        <EventDetails key={index}>
          <EventThumbnail thumbnailUri="https://reactnative.dev/img/tiny_logo.png"/>
            <RightColumn>
              <EventHeading title={event.fields["Event Name"]} />
              <EventDate 
                icon={<Feather name="calendar" size={28} />}
                eventDate={new Date(event.fields["Event Date"])} 
              />
              <EventTime 
                icon={<Feather name="clock" size={28} />}
                eventTime={Number(event.fields["Event time"])} />
            </RightColumn>

        </EventDetails>
    )
  })

  return <>{eventList}</>
}

export default EventSummary
