import { configureStore } from "@reduxjs/toolkit";
import episodePlayerReducer from './episodePlayer'
import subscriptionReducer from './subscription'
import userReducer from './user'
import queueReducer from './queue'
import searchReducer from './search'

export default configureStore({
  reducer: {
    episodePlayer: episodePlayerReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    queue: queueReducer,
    search: searchReducer
  }
})