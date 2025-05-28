import { useEffect } from 'react'
import { CallUI } from './components/call'
import { useMeetingContext } from './hooks/useMeetingContext'
import { Loader } from 'lucide-react'

export const MeetingRoom = () => {
  const { videoClient, chatClient, call, chat, connectClients, isLoading } = useMeetingContext()

  useEffect(() => {
    if (!isLoading) connectClients()
  }, [isLoading])

  return !call || !chat ? (
    <Loader />
  ) : (
    <CallUI call={call} chat={chat} videoClient={videoClient} chatClient={chatClient} />
  )
}
