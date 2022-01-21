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
  fields: {}
}

export type Events = Event[]
