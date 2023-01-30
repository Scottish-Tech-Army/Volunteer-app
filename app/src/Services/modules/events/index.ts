/**
 * @file Defines the Event type (and related types), and the lazy queries for fetching events data from the API.
 */

import { api } from '../../api'
import fetchAllEvents from './fetchAll'

export interface Event {
  id: string
  name: string
  status: string
  date: string // in format YYYY-MM-DD
  time: string // using 24-hour clock in format 19:00
  duration: number // minutes
  description: string // note: this may contain markdown code
  type: string
  series: string
  related_initiative: string
  video_webpage: string
  video_file: string
  video_thumbnail: string
  images: string[]
  speakers: EventSpeaker[]
}

export interface EventSpeaker {
  name: string
  url: string
  addedToCalendar?: boolean
}

export type Events = Event[]

export enum EventsRange {
  All = 'all',
  MyEvents = 'myEvents',
  Past = 'past',
  Upcoming = 'upcoming',
}

export enum EventsSearchField {
  Description = 'description',
  Name = 'name',
  RelatedInitiative = 'related_initiative',
  Series = 'series',
}

export const eventsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAllPastEvents: fetchAllEvents(build, EventsRange.Past),
    fetchAllUpcomingEvents: fetchAllEvents(build, EventsRange.Upcoming),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchAllPastEventsQuery,
  useLazyFetchAllUpcomingEventsQuery,
} = eventsApi
