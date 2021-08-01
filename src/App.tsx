import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import './App.css'
import Meeting from './components/Meeting'
import randomBytes from './helpers/randomBytes'

const newMeetingHash = randomBytes(20)

export default function App() {
  const [meetingHash, setMeetingHash] = useState('')

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Link to={`/${newMeetingHash}`}>New meeting</Link>
          <input
            placeholder="Past meeting hash"
            value={meetingHash}
            onChange={(event) => setMeetingHash(event.target.value)}
          />
          {meetingHash && <Link to={`/${meetingHash}`}>Join</Link>}
        </Route>
        <Route path="/:meetingHash([0-9a-f]{40})">
          <Meeting />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}
