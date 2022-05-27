import { api } from '../../api'
import fetchAllEvents from './fetchAll'

export const eventsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAllEvents: fetchAllEvents(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchAllEventsQuery } = eventsApi

export interface Event {
  id: string
  name: string
  status: string
  date: string // in format YYYY-MM-DD
  time: string // using 24-hour clock in format 19:00
  duration: number // seconds
  description: string // this may contain HTML
  type: string
  series: string
  video: string
  images: string[]
}

export type Events = Event[]
