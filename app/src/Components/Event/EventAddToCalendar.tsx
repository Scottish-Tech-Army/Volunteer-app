/**
 * @file Event add to calendar button.
 */

import React, { FC, useState } from 'react'
import { Alert, Platform } from 'react-native'
import RNCalendarEvents, {
  CalendarEventWritable,
  Options,
} from 'react-native-calendar-events' // see docs at https://github.com/wmcmahan/react-native-calendar-events
import RemoveMarkdown from 'remove-markdown'
import IconAndLabel from '@/Components/IconAndLabel'
import { Event } from '@/Services/modules/events'
import { end } from '@/Utils/Events'

interface EventAddToCalendarProps {
  event: Event
}

/**
 * Component for an event add to calendar button
 *
 * @param {EventDetailsProps} props The component props
 * @param {Event} props.event The event
 * @returns ReactElement Component
 */
const EventAddToCalendar: FC<EventAddToCalendarProps> = ({ event }) => {
  const [eventAdded, setEventAdded] = useState(false)

  const onPress = async () => {
    if (eventAdded) return

    try {
      let permissionToAccessCalendar = await RNCalendarEvents.checkPermissions()

      if (permissionToAccessCalendar !== 'authorized') {
        permissionToAccessCalendar = await RNCalendarEvents.requestPermissions()
      }

      if (permissionToAccessCalendar === 'authorized') {
        const eventEnd = end(event)
        const eventDetails = {
          startDate: `${event.date}T${event.time}:00.000Z`,
          endDate: `${eventEnd.date}T${eventEnd.time}:00.000Z`,
          description: RemoveMarkdown(event.description),
        } as CalendarEventWritable

        // Fix calendar syncing issue specific to Android
        const eventOptions =
          Platform.OS === 'android' ? ({ sync: true } as Options) : undefined

        const deviceEventId = await RNCalendarEvents.saveEvent(
          event.name,
          eventDetails,
          eventOptions,
        )

        if (deviceEventId) setEventAdded(true)
      } else {
        Alert.alert('Sorry, we ran into a problem adding this to your calendar')
      }
    } catch (error) {
      console.error('Error accessing device calendar', error)
    }
  }

  return (
    <IconAndLabel
      icon={eventAdded ? 'check-square' : 'calendar'}
      onPress={onPress}
      text="Add to calendar"
    />
  )
}

export default EventAddToCalendar
