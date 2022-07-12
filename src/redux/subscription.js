import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subscriptions: [],
}

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addSubscription: (state, action) => {
      state.subscriptions.push(action.payload)
    },
    removeSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.name !== action.payload
      )
    },
    getSubscriptions: (state, action) => {
      state.subscriptions = action.payload
    },
  },
})

export const { addSubscription, removeSubscription, getSubscriptions } =
  subscriptionSlice.actions

export default subscriptionSlice.reducer
