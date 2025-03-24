import { configureStore } from '@reduxjs/toolkit'
import searchSlice  from "../features/searchSlice"
import userSlice from '../features/userSlice';


const store = () => {
  return configureStore({
    reducer: {
      search: searchSlice,
      user: userSlice,
    },
  })
}

export default store;