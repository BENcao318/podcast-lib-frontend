import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SubscriptionInterface } from '../utils/interfaces'

interface SubscriptionInitialState {
  subscriptions: SubscriptionInterface[]
}

const initialState: SubscriptionInitialState = {
  subscriptions: [],
}

export const subscriptionSlice: any = createSlice({
  name: 'subscription',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addSubscription: (state, action: PayloadAction<SubscriptionInterface>) => {
      state.subscriptions.push(action.payload)
    },
    removeSubscription: (state, action: PayloadAction<string>) => {
      state.subscriptions = state.subscriptions.filter(
        (subscription: any) => subscription.name !== action.payload
      )
    },
    getSubscriptions: (
      state,
      action: PayloadAction<SubscriptionInterface[]>
    ) => {
      state.subscriptions = action.payload
    },
  },
})

export const { addSubscription, removeSubscription, getSubscriptions } =
  subscriptionSlice.actions

export default subscriptionSlice.reducer
