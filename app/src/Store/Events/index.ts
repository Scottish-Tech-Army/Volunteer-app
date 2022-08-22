// Set up the Redux store to allow us to share events data across different app components
// setEvents is what is dispatched to store events

import { createSlice } from '@reduxjs/toolkit'
import { Events } from '@/Services/modules/events'

const slice = createSlice({
  name: 'events',
  initialState: { upcoming: [] } as EventsState,
  reducers: {
    setEvents: (state, { payload: { upcoming } }: EventsPayload) => {
      if (typeof upcoming !== 'undefined') {
        state.upcoming = upcoming
      }
    },
  },
})

export const { setEvents } = slice.actions

export default slice.reducer

export type EventsState = {
  upcoming: Events
}

type EventsPayload = {
  payload: {
    upcoming: Events
  }
}
