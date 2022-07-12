import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  queues: [],
}

export const queueSlice = createSlice({
  name: 'queues',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addQueue: (state, action) => {
      state.queues.push(action.payload)
    },
    removeQueue: (state, action) => {
      state.queues = state.queues.filter(
        (queue) => queue.track_id !== action.payload
      )
    },
    getQueues: (state, action) => {
      state.queues = action.payload
    },
  },
})

export const { addQueue, removeQueue, getQueues } = queueSlice.actions

export default queueSlice.reducer
