import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice.jsx'

export const store = configureStore({
  reducer: {
    paste : pasteReducer,
  },
})