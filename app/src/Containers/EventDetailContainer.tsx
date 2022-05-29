import React from 'react'
import EventDetails from '@/Components/Event/EventDetails'
import SafeArea from '@/Components/SafeArea'
import Theme from '@/Theme/OldTheme'
import { Event } from '@/Services/modules/events/index'

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
