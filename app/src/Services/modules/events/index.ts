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
  date: string
  time: string
  duration: number // seconds
  description: string
  type: string
  series: string
  video: string
  createdTime: string
}

export type Events = Event[]
