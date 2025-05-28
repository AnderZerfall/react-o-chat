import { Call, StreamVideoClient } from '@stream-io/video-client'
import { ReactNode, createContext } from 'react'
import { Channel, StreamChat } from 'stream-chat'
import { useMeeting } from '../hooks/useMeeting'
import { Call as CallType } from '../interfaces/Call'

export interface MeetingContextProps {
  videoClient: StreamVideoClient
  chatClient: StreamChat
  scheduleMeeting: (call: CallType) => Promise<string | undefined>
  connectClients: () => Promise<void>
  call?: Call
  chat?: Channel
  isLoading?: boolean
}

export const MeetingContext = createContext<MeetingContextProps>({} as MeetingContextProps)

export const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, videoClient, chatClient, call, chat, connectClients, scheduleMeeting } = useMeeting()

  return (
    <MeetingContext.Provider
      value={{ isLoading, videoClient, chatClient, call, chat, connectClients, scheduleMeeting }}
    >
      {children}
    </MeetingContext.Provider>
  )
}
