import BittorrentTracker from 'bittorrent-tracker'
import WebSocketTracker from 'bittorrent-tracker/lib/client/websocket-tracker'
import { announceList } from 'create-torrent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import randomBytes from '../helpers/randomBytes'
import { Peer } from '../types/peer'
import './Meeting.css'

const createPeerBackup = WebSocketTracker.prototype._createPeer

const peerId = randomBytes(20)
const textDecoder = new TextDecoder('utf-8')

export default function Meeting() {
  const { meetingHash } = useParams<{ meetingHash: string }>()
  const [peers, setPeers] = useState<{ [peerId: string]: Peer }>({})
  const [myStream, setMyStream] = useState<MediaStream>()
  const [remoteStreams, setRemoteStreams] = useState<{
    [peerId: string]: MediaStream
  }>({})
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        setMyStream(stream)
        return () => {
          stream.getTracks().forEach((track) => track.stop())
        }
      } catch (error) {
        console.error('Error while getting media', error)
      }
    }

    getMedia()
  }, [])

  useEffect(() => {
    if (!myStream) {
      return
    }

    WebSocketTracker.prototype._createPeer = function (opts: any) {
      return createPeerBackup.call(this, { ...opts, stream: myStream })
    }

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
        setRemoteStreams((remoteStreams) => {
          const { [peer.id]: removedStream, ...remainingStreams } =
            remoteStreams
          return remainingStreams
        })
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

      peer.on('stream', (stream) => {
        console.log('Received stream', peer, stream)
        setRemoteStreams((remoteStreams) => ({
          ...remoteStreams,
          [peer.id]: stream,
        }))
      })
    })

    client.start()
    return () => {
      client.stop()
    }
  }, [meetingHash, myStream])

  return (
    <div>
      <div>Meeting hash: {meetingHash}</div>
      <div>Peers connected: {Object.keys(peers).length + 1}</div>
      {myStream && (
        <video
          ref={(videoElement) =>
            videoElement &&
            (videoElement.srcObject as any)?.id !== myStream.id &&
            (videoElement.srcObject = myStream)
          }
          autoPlay
          playsInline
          controls={false}
        />
      )}
      {Object.values(remoteStreams).map((remoteStream) => (
        <video
          key={remoteStream.id}
          ref={(videoElement) =>
            videoElement &&
            (videoElement.srcObject as any)?.id !== remoteStream.id &&
            (videoElement.srcObject = remoteStream)
          }
          autoPlay
          playsInline
          controls={false}
        />
      ))}
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
