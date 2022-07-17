import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QueueInterface } from '../utils/interfaces'

interface QueueInitialState {
  queues: QueueInterface[]
}

const initialState: QueueInitialState = {
  queues: [],
}

export const queueSlice: any = createSlice({
  name: 'queues',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addQueue: (state, action: PayloadAction<QueueInterface>) => {
      state.queues.push(action.payload)
    },
    removeQueue: (state, action: PayloadAction<number>) => {
      state.queues = state.queues.filter(
        (queue) => queue.track_id !== action.payload
      )
    },
    getQueues: (state, action: PayloadAction<QueueInterface[]>) => {
      state.queues = action.payload
    },
  },
})

export const { addQueue, removeQueue, getQueues } = queueSlice.actions

export default queueSlice.reducer
