import React, { useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTable,
  selectTables,
  selectReady
} from './standingSlice'
import styles from './standing.module.css'
import FormList from '../../components/formList'

import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

export function Standing({ league, history }) {
  const dispatch = useDispatch()
  const tables = useSelector(selectTables)
  const ready = useSelector(selectReady)
  const table = ready ? tables[league] : null

  useEffect(() => {
    if (!table)
      dispatch(fetchTable(league))
  }, [])

  const onClickRow = team => () => {
    history.push(`/team/${team}`)
  }

  return (
    <Card>
      <Card.Body className="py-0">
      <Table className="mb-0" hover>
      <thead className={styles.standingHead}>
        <tr>
          <th colSpan="2" scope="col">Team</th>
          <th scope="col">Form</th>
          <th scope="col">Played</th>
          <th scope="col">Win</th>
          <th scope="col">Draw</th>
          <th scope="col">Lose</th>
          <th scope="col">Goals</th>
          <th scope="col">Conceded</th>
          <th scope="col">Difference</th>
          <th scope="col">Points</th>
        </tr>
      </thead>

      
      <tbody>
      {
        ready && table &&
        table.map(team => {
          return (
            <tr onClick={onClickRow(team.team_id)} key={team.team_id}>
              <td className="align-middle">
                <Image className={styles.clubLogo} src={team.logo} />
              </td>
              <th className="font-weight-normal align-middle" scope="row">{ team.teamName }</th>
              <td className="align-middle">
                <FormList forms={ team.forme } />
                
              </td>
              <td className="align-middle">{ team.all.matchsPlayed }</td>
              <td className="align-middle">{ team.all.win }</td>
              <td className="align-middle">{ team.all.draw }</td>
              <td className="align-middle">{ team.all.lose }</td>
              <td className="align-middle">{ team.all.goalsFor }</td>
              <td className="align-middle">{ team.all.goalsAgainst }</td>
              <td className="align-middle">{ team.goalsDiff }</td>
              <td className="align-middle">{ team.points }</td>
            </tr>
          )
        })
      }
      </tbody>
    </Table>
    </Card.Body>
    </Card>
  )
}

export default withRouter(Standing)