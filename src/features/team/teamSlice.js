import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teams: [],
    ready: false
  },
  reducers: {
    addTeam: (state, { payload }) => {
      const { team } = payload
      state.teams.push(team)
    },
    setReady: state => {
      state.ready = true
    },
    setUnready: state => {
      state.ready = false
    }
  },
});

export const { addTeam, setReady, setUnready } = teamSlice.actions;

export const fetchTeam = teamId => async dispatch => {
  dispatch(setUnready())
  const { 
    REACT_APP_API_URL,
    REACT_APP_API_HEADER_HOST,
    REACT_APP_API_HEADER_KEY 
  } = process.env
  
  const { data } = await axios({
    method: 'get',
    url: `${REACT_APP_API_URL}/teams/team/${teamId}`,
    headers: {
      'x-rapidapi-host': REACT_APP_API_HEADER_HOST,
      'x-rapidapi-key': REACT_APP_API_HEADER_KEY
    }
  })

  const { teams } = data.api.results.
  dispatch(addTeam({
    team: teams[0]
  }))
  dispatch(setReady())
}

export const selectTeams = state => state.team.teams
export const selectTeamById = id => state => state.team.teams.filter(t => t.team_id === id)[0]
export const selectReady = state => state.standing.ready

export default teamSlice.reducer;
