import { configureStore } from '@reduxjs/toolkit'
import standingReducer from '../features/standing/standingSlice'
import teaminfoReducer from '../features/team/teamSlice'

export default configureStore({
  reducer: {
    standing: standingReducer,
    team: teaminfoReducer
  }
});
