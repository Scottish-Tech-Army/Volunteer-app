/**
 * @file Set up the Redux store to allow us to share events data across different app components
 * setEvents is what's dispatched to actually store the events
 */

import { createSlice } from '@reduxjs/toolkit'
import { Events } from '@/Services/modules/events'

const slice = createSlice({
  name: 'events',
  initialState: { past: undefined, upcoming: undefined } as EventsState,
  reducers: {
    setEvents: (state, { payload: { past, upcoming } }: EventsPayload) => {
      if (typeof past !== 'undefined') {
        state.past = past
      }
      if (typeof upcoming !== 'undefined') {
        state.upcoming = upcoming
      }
    },
  },
})

export const { setEvents } = slice.actions

export default slice.reducer

export type EventsState = {
  past: Events | undefined
  upcoming: Events | undefined
}

type EventsPayload = {
  payload: {
    past?: Events
    upcoming?: Events
  }
}
