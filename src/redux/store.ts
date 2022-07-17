import { configureStore } from '@reduxjs/toolkit'
import episodePlayerReducer from './episodePlayer'
import subscriptionReducer from './subscription'
import userReducer from './user'
import queueReducer from './queue'

export const store = configureStore({
  reducer: {
    episodePlayer: episodePlayerReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    queue: queueReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
