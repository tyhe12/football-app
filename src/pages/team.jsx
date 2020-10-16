import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

export default function Team() {
  let { id } = useParams()

  return (
    <Container className="home my-4">
      This is team page with team {id}
      
    </Container>
  )
}