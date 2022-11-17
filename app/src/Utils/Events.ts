/**
 * @file Useful shared functions for dealing with events.
 */

import dayjs from 'dayjs'
import { Event } from '@/Services/modules/events'

export interface EventEnd {
  date: string // YY-MM-DD
  time: string // HH:mm
}

/**
 * Work out the event's end date and time
 *
 * @param {Event} event An event
 * @returns {object} An object with two properties -- date (YY-MM-DD format) and time (HH:MM)
 */
export const end = (event: Event): EventEnd => {
  const eventStart = dayjs(`${event.date} ${event.time}`)
  const eventEnd = eventStart.add(event.duration, 'minute')

  return {
    date: eventEnd.format('YYYY-MM-DD'),
    time: eventEnd.format('HH:mm'),
  } as EventEnd
}

/**
 * Determine if an event has already started (either because it's happening right now, or it's started and finished)
 *
 * @param {Event} event An event
 * @returns {boolean}
 */
export const hasStarted = (event: Event): boolean => {
  const eventStart = dayjs(`${event.date} ${event.time}`)
  const now = dayjs()

  return eventStart.isBefore(now)
}

/**
 * Determine if an event is upcoming
 *
 * @param {Event} event An event
 * @returns {boolean}
 */
export const isUpcoming = (event: Event): boolean => {
  const eventStart = dayjs(`${event.date} ${event.time}`)
  const eventEnd = eventStart.add(event.duration, 'minute')
  const now = dayjs()

  // Compare against end time rather than start time, in order to include an event that is
  // in progress right now as an upcoming event (feels more logical than it appearing as a
  // past event, if it hasn't ended yet)
  return eventEnd.isAfter(now)
}
