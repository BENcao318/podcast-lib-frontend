import { configureStore } from "@reduxjs/toolkit";
import episodePlayerReducer from './episodePlayer'
import subscriptionReducer from './subscription'
import userReducer from './user'
import queueReducer from './queue'

export default configureStore({
  reducer: {
    episodePlayer: episodePlayerReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    queue: queueReducer
  }
})