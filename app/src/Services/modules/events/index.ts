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
  id: string,
  fields: {
    "Event Name": string,
    "Event Status": string,
    "Event Date": string,
    "Event time": number,
    "Duration": number,
    "Event Description": string,
    "Event Type": string,
    "Event Series": string
  },
  createdTime: string
}

export type Events = Event[]
