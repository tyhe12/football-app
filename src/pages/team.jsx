import React from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import TeamInfo from '../features/team/team'

export default function Team() {
  let { id } = useParams()

  return (
    <Container className="home my-4">
      <TeamInfo id={ id } />
    </Container>
  )
}