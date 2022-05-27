import React from 'react'
import styled from 'styled-components/native'
import Theme from '@/Theme/OldTheme'
import { Event } from '@/Services/modules/events/index'
import EventDetails from '@/Components/Event/EventDetails'

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const EventDetailContainer = (props: {
  route: { params: { event: Event } }
}) => {
  const { event } = props.route.params

  return (
    <SafeArea>
      <Theme>
        <EventDetails event={event} />
      </Theme>
    </SafeArea>
  )
}

export default EventDetailContainer
