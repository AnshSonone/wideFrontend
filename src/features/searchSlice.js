import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    Search: (state, action) => {
        state.value = action.payload
    },

    Login: (state, action) => {
      state.value = action.payload
    },

    Logout: (state, action) => {
      state.value = null
    },

  },
})

// Action creators are generated for each case reducer function
export const { Search, Login, Logout } = searchSlice.actions


export const selectorSearch = (state)  => state.search.value

export default searchSlice.reducer