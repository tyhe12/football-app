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
      const { team_id: id } = payload
      if (state.teams.findIndex(t => t.team_id === id) < 0)
        state.teams.push(payload)
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
  
  const { data: teamData } = await axios({
    method: 'get',
    url: `${REACT_APP_API_URL}/teams/team/${teamId}`,
    headers: {
      'x-rapidapi-host': REACT_APP_API_HEADER_HOST,
      'x-rapidapi-key': REACT_APP_API_HEADER_KEY
    }
  })

  const { data: squadData } = await axios({
    method: 'get',
    url: `${REACT_APP_API_URL}/players/squad/${teamId}/2020-2021`,
    headers: {
      'x-rapidapi-host': REACT_APP_API_HEADER_HOST,
      'x-rapidapi-key': REACT_APP_API_HEADER_KEY
    }
  })

  const { teams } = teamData.api
  const { players } = squadData.api
  dispatch(addTeam({
    ...teams[0],
    squad: players
  }))

  dispatch(setReady())
}

export const selectTeams = state => state.team.teams
export const selectTeamById = id => state => state.team.teams.filter(t => t.team_id === id)[0]
export const selectReady = state => state.team.ready

export default teamSlice.reducer;
