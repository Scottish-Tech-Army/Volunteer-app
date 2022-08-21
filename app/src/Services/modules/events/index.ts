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
  date: string
  time: string
  duration: number // minutes
  description: string
  type: string
  series: string
  video: string
  images: string[]
}

export type Events = Event[]
