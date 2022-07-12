import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged_in: false,
  user: {},
}

export const userSlice = createSlice({
  name: 'userStatus',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    userLogin: (state, action) => {
      state.logged_in = true
      state.user = action.payload
    },
    userLogout: (state) => {
      state.logged_in = false
      state.user = {}
    },
  },
})

export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer
