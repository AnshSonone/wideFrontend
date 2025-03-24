import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  loggedin: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    LoginStatus: (state, action) => {
      state.data = action.payload,
      state.loggedin = true
    },

    LogoutStatus: (state, action) => {
      state.data = null,
      state.loggedin = false
    },

  },
})

// Action creators are generated for each case reducer function
export const { LoginStatus, LogoutStatus } = userSlice.actions


export const selectorUser = (state)  => state.user

export default userSlice.reducer