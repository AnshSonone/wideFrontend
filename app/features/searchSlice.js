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

  },
})

// Action creators are generated for each case reducer function
export const { Search } = searchSlice.actions


export const selectorSearch = (state)  => state.search.value

export default searchSlice.reducer