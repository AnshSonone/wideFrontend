import thunkMiddleware from "redux-thunk" 
import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import searchSlice from "@/features/searchSlice"
import { setupListeners } from "@reduxjs/toolkit/query"

// const composedEnhancer = applyMiddleware(thunkMiddleware)

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice,
    },

    // composedEnhancer
  })
}




setupListeners(makeStore.dispatch)

export default makeStore;