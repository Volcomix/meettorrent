import BittorrentTracker from 'bittorrent-tracker'
import { announceList } from 'create-torrent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import randomBytes from '../helpers/randomBytes'
import { Peer } from '../types/peer'
import './Meeting.css'

const peerId = randomBytes(20)
const textDecoder = new TextDecoder('utf-8')

export default function Meeting() {
  const { meetingHash } = useParams<{ meetingHash: string }>()
  const [peers, setPeers] = useState<{ [peerId: string]: Peer }>({})
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const client = new BittorrentTracker({
      peerId,
      infoHash: meetingHash,
      announce: announceList,
    })

    client.on('peer', (peer: Peer) => {
      console.log('Peer found', peer)

      peer.on('connect', () => {
        console.log('New peer connected', peer)
        setPeers((peers) => ({ ...peers, [peer.id]: peer }))
      })

      peer.on('close', () => {
        console.log('Peer disconnected', peer)
        setPeers((peers) => {
          const { [peer.id]: removedPeer, ...remaingPeers } = peers
          return remaingPeers
        })
      })

      peer.on('error', (error) => {
        console.log('Peer error', error, peer)
      })

      peer.on('data', (data) => {
        setMessages((messages) => [...messages, textDecoder.decode(data)])
      })
    })

    client.start()
    return () => client.stop()
  }, [meetingHash])

  return (
    <div>
      <div>Meeting hash: {meetingHash}</div>
      <div>Peers connected: {Object.keys(peers).length + 1}</div>
      <form>
        <input
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          onClick={(event) => {
            event.preventDefault()
            Object.values(peers).forEach((peer) => peer.send(message))
            setMessages((messages) => [...messages, message])
            setMessage('')
          }}
        >
          Send
        </button>
      </form>
      {messages.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </div>
  )
}
