import React, { useEffect, useMemo } from 'react'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTeams,
  fetchTeam,
  selectReady
} from './teamSlice'

export default function TeamInfo({ id }) {
  const dispatch = useDispatch()
  const ready = useSelector(selectReady)
  const teams = useSelector(selectTeams)
  
  // const team = useMemo(() => {
  //   const idNum = parseInt(id)
  //   if (ready) {
  //     const team = teams.find(t => t.team_id === idNum)
  //     return team
  //   }
  // }, [teams, ready, id])
  const idNum = parseInt(id)
  const team = ready ? teams.find(t => t.team_id === idNum) : null
  
  useEffect(() => {
    if (!team)
      dispatch(fetchTeam(id))
  }, [])

  return (
    <div className="team-info">
      {
        ready && team &&
        <div>
          <div className="d-flex team-meta">
            <Image src={ team.logo } />
            <div className="d-flex pb-4 flex-column justify-content-end">
              <h2>{ team.name }</h2>
              <h3>{ team.country }</h3>
            </div>
          </div>

          <div className="squad-info">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Nationality</th>
                </tr>
              </thead>

              <tbody>
                {
                  team.squad.map(player => {
                    return (
                      <tr key={ player.player_id }>
                        <td>{ player.player_name }</td>
                        <td>{ player.position }</td>
                        <td>{ player.nationality }</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>

        </div>
        
      }
    </div>
  )
} 