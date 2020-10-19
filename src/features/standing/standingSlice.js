import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const standingSlice = createSlice({
  name: 'standing',
  initialState: {
    tables: {
      english: null,
      french: null
    },
    ready: false
  },
  reducers: {
    setTable: (state, { payload }) => {
      const { league, table } = payload
      state.tables[league] = table
    },
    setReady: state => {
      state.ready = true
    },
    setUnready: state => {
      state.ready = false
    }
  },
});

export const { setTable, setReady, setUnready } = standingSlice.actions;

export const fetchTable = league => async dispatch => {
  dispatch(setUnready())
  const { 
    REACT_APP_API_URL,
    REACT_APP_ENGLISH_LEAGUE_ID,
    REACT_APP_FRENCH_LEAGUE_ID,
    REACT_APP_CHAMPIONS_LEAGUE_ID,
    REACT_APP_API_HEADER_HOST,
    REACT_APP_API_HEADER_KEY 
  } = process.env
  
  const leagueId = league === 'english' ? REACT_APP_ENGLISH_LEAGUE_ID
    : league === 'french' ? REACT_APP_FRENCH_LEAGUE_ID
    : REACT_APP_CHAMPIONS_LEAGUE_ID
  const { data } = await axios({
    method: 'get',
    url: `${REACT_APP_API_URL}/leagueTable/${leagueId}`,
    headers: {
      'x-rapidapi-host': REACT_APP_API_HEADER_HOST,
      'x-rapidapi-key': REACT_APP_API_HEADER_KEY
    }
  })

  const { standings } = data.api
  dispatch(setTable({
    league,
    table: standings[0]
  }))
  dispatch(setReady())
}

export const selectEnglishTable = state => state.standing.tables.english;
export const selectFrenchTable = state => state.standing.tables.french;
export const selectTables = state => state.standing.tables
export const selectReady = state => state.standing.ready

export default standingSlice.reducer;
