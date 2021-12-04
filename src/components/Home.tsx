import { useState } from 'react'
import { Link } from 'react-router-dom'
import randomBytes from '../helpers/randomBytes'

export default function Home() {
  const [newMeetingHash] = useState(() => randomBytes(20))
  const [meetingHash, setMeetingHash] = useState('')

  return (
    <div>
      <Link to={`/${newMeetingHash}`}>New meeting</Link>
      <input
        placeholder="Past meeting hash"
        value={meetingHash}
        onChange={(event) => setMeetingHash(event.target.value)}
      />
      {meetingHash && <Link to={`/${meetingHash}`}>Join</Link>}
    </div>
  )
}
