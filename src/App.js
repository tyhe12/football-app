import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Home from './pages/home'
import Team from './pages/team'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark">
          <Nav className="mr-auto">
            <NavLink as={Nav.Link} to="/">Home</NavLink>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/team/:id">
            <Team />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
