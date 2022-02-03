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

  fields: {
    "id": string,
    "Event Name": string,
    "Event Status": string,
    "Event Date": Date,
    "Event time": number,
    "Duration": number,
    "Event Description": string,
    "Event Type": string,
    "Event Series": string
  },
  "createdTime": "2021-11-22T20:25:48.000Z"

}

export type Events = Event[]
