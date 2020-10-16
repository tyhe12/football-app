import React, { useState } from 'react'
import Standing from '../features/standing/standing'

import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export default function Home() {
  const [key, setKey] = useState('english')
  const selectHandler = k => {
    setKey(k)
  }

  return (
    <Container className="home my-4">
      <Tabs
        fill
        transition={false}
        id="controlled-tab"
        activeKey={key}
        onSelect={selectHandler}
      >
        <Tab eventKey="english" title="Premier League">
          <Standing league="english" />
        </Tab>
        <Tab eventKey="french" title="Ligue 1">
          <Standing league="french" />
        </Tab>
      </Tabs>
      
    </Container>
  )
}