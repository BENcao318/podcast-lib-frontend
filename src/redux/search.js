import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchPodcastResult: {},
  searchEpisodeResult: {}
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    setSearchPodcastResult: (state, action) => {
      state.searchPodcastResult = action.payload
    },
    setSearchEpisodeResult: (state, action) => {
      state.searchEpisodeResult = action.payload
    }
  }
})

export const { setSearchPodcastResult, setSearchEpisodeResult } = searchSlice.actions

export default searchSlice.reducer