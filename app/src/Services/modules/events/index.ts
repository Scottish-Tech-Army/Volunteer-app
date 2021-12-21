import { api } from '../../api'
import fetchAll from './fetchAll'

export const eventsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAll: fetchAll(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchAllQuery } = eventsApi

export interface Event {
  name: string
  date: Date
}

export type Events = Event[]
