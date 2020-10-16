import { configureStore } from '@reduxjs/toolkit'
import standingReducer from '../features/standing/standingSlice'

export default configureStore({
  reducer: {
    standing: standingReducer
  }
});
