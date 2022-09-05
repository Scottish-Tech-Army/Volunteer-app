import { api } from '../../api'
import fetchAllEvents from './fetchAll'

export enum EventsRange {
  Past = 'past',
  Upcoming = 'upcoming',
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
  video_webpage: string
  video_file: string
  video_thumbnail: string
  images: string[]
}

export type Events = Event[]
