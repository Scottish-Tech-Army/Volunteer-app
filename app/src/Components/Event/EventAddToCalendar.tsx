/**
 * @file Event add to calendar button.
 */

import React, { FC, useState } from 'react'
import { Alert, Modal } from 'react-native'
import RNCalendarEvents, {
  Calendar,
  CalendarEventWritable,
} from 'react-native-calendar-events' // see docs at https://github.com/wmcmahan/react-native-calendar-events
import { useDispatch, useSelector } from 'react-redux'
import RemoveMarkdown from 'remove-markdown'
import styled from 'styled-components/native'
import Button from '../Forms/Button'
import IconAndLabel from '../IconAndLabel'
import Title from '../Title'
import { Event } from '@/Services/modules/events'
import { EventsState, setEvents } from '@/Store/Events'
import { end } from '@/Utils/Events'

const ModalContent = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
`

const CalendarList = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 0;
  width: 100%;
`

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
  const allUpcomingEvents = useSelector(
    (state: { events: EventsState }) => state.events.upcoming,
  )
  const dispatch = useDispatch()
  const [eventAdded, setEventAdded] = useState(Boolean(event.addedToCalendar))
  const [calendars, setCalendars] = useState<Calendar[] | undefined>()
  const [chooseCalendarModalVisible, setChooseCalendarModalVisible] =
    useState(false)
  const [selectedCalendarId, setSelectedCalendarId] = useState<
    string | undefined
  >()

  const onPress = async () => {
    if (eventAdded) {
      // Allow the user to decide if they want to add an event the second time
      // e.g. they could have deleted it by accident or they want to add it to a different calendar
      Alert.alert(
        'Event already added',
        'Do you want to add this to your calendar again?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            style: 'default',
            onPress: () => checkCalendarAccess(),
          },
        ],
      )
    } else {
      checkCalendarAccess()
    }
  }

  /**
   * Connects to the device's calendars
   * We need to do this first, to check we can get access, and in case the user needs to choose which calendar (if they have more than one)
   *
   * @returns void
   */
  const checkCalendarAccess = async () => {
    try {
      let permissionToAccessCalendar = await RNCalendarEvents.checkPermissions()

      if (permissionToAccessCalendar !== 'authorized') {
        permissionToAccessCalendar = await RNCalendarEvents.requestPermissions()
      }

      if (permissionToAccessCalendar === 'authorized') {
        const deviceCalendars = await RNCalendarEvents.findCalendars()

        if (!deviceCalendars?.length) {
          console.error('Could not get calendars')
          // If cannot get list of device calendars, try adding event to default calendar
          addToCalendar()
        } else if (deviceCalendars.length === 1) {
          addToCalendar(deviceCalendars[0].id)
        } else {
          // If user's device has multiple calendars, allow them to choose which calendar to add event to
          setCalendars(deviceCalendars)
          setSelectedCalendarId(deviceCalendars[0].id)
          setChooseCalendarModalVisible(true)
        }
      } else {
        Alert.alert('Sorry, we ran into a problem accessing your calendar')
      }
    } catch (error) {
      console.error('Error accessing device calendar', error)
      Alert.alert('Sorry, we ran into a problem accessing your calendar')
    }
  }

  /**
   * Actually adds the event to the device calendar, once we've got access to calendars and determined which one to use
   *
   * @param {string} [calendarId] The ID of the device calendar the user wants to add the event to -- if not specified, we add the event to the default calendar
   * @returns void
   */
  const addToCalendar = async (calendarId?: string) => {
    try {
      const eventEnd = end(event)
      const eventDetails = {
        startDate: `${event.date}T${event.time}:00.000Z`,
        endDate: `${eventEnd.date}T${eventEnd.time}:00.000Z`,
        description: RemoveMarkdown(event.description),
      } as CalendarEventWritable

      if (calendarId) eventDetails.calendarId = calendarId

      const deviceEventId = await RNCalendarEvents.saveEvent(
        event.name,
        eventDetails,
      )

      if (deviceEventId) {
        setEventAdded(true)

        // Update the Redux store, so that if the user returns to this event page on this same device (at least in the same session)
        // we will know if they've already added this to their calendar
        const allUpcomingEventsUpdated = allUpcomingEvents?.map(upcomingEvent =>
          upcomingEvent.id === event.id
            ? { ...upcomingEvent, addedToCalendar: true }
            : upcomingEvent,
        )
        dispatch(setEvents({ upcoming: allUpcomingEventsUpdated }))
      }
    } catch (error) {
      console.error('Error accessing device calendar', error)
      Alert.alert('Sorry, we ran into a problem adding this to your calendar')
    }

    setChooseCalendarModalVisible(false)
  }

  return (
    <>
      <IconAndLabel
        icon={eventAdded ? 'check-square' : 'calendar'}
        onPress={onPress}
        text={`${eventAdded ? 'Added' : 'Add'} to calendar`}
      />

      {/* Modal to allow user to choose which calendar to add the event to, if needed */}
      <Modal
        visible={chooseCalendarModalVisible}
        onRequestClose={() => {
          setChooseCalendarModalVisible(false)
        }}
      >
        <ModalContent>
          <Title text="Choose calendar" type="subtitle" />

          <CalendarList>
            {calendars?.map(calendar => (
              <Button
                disabled={false}
                key={calendar.id}
                listItem
                listSelected={calendar.id === selectedCalendarId}
                onPress={() => setSelectedCalendarId(calendar.id)}
                text={calendar.title}
              />
            ))}
          </CalendarList>

          <Button
            disabled={false}
            onPress={() => addToCalendar(selectedCalendarId as string)}
            primary
            text="Add event"
          />

          <Button
            disabled={false}
            onPress={() => setChooseCalendarModalVisible(false)}
            text="Cancel"
          />
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventAddToCalendar
