import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Meeting from './components/Meeting'

export default function App() {
  return (
    <Router basename="/meettorrent">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:meetingHash" element={<Meeting />} />
      </Routes>
    </Router>
  )
}
