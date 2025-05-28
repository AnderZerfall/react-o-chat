import { Card } from '@/components/ui/card'
import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import { Channel, StreamChat } from 'stream-chat'
import { Channel as ChannelComponent, Chat, MessageInput, MessageList, Thread } from 'stream-chat-react'
import { MessageOutput } from './messate-output'
import { Users } from 'lucide-react'
import { CustomMessageInput } from './message-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNavigate } from 'react-router'

interface CallProps {
  videoClient: StreamVideoClient
  chatClient: StreamChat
  chat: Channel
  call: Call
}

export const CallUI = ({ videoClient, chatClient, chat, call }: CallProps) => {
  return (
    <div className="grid grid-cols-[3fr_1fr] h-screen w-full bg-background">
      <div className="relative h-full flex items-center justify-center overflow-hidden border-r border-border">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0d] via-[#13131a] to-[#010104] opacity-100" />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-950 opacity-20 rounded-full blur-3xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-fuchsia-900 opacity-25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-cyan-950 opacity-25 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="w-[95%] h-[95%] rounded-3xl bg-background/80 border border-border shadow-2xl backdrop-blur-lg flex items-center justify-center">
            <StreamTheme>
              <StreamVideo client={videoClient}>
                <StreamCall call={call}>
                  <MyUILayout />
                </StreamCall>
              </StreamVideo>
            </StreamTheme>
          </div>
        </div>
      </div>

      <Card className="relative h-screen rounded-none border-0 bg-transparent flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050509] via-[#0a0a12] to-[#000001] opacity-100" />
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-fuchsia-900 opacity-35 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-cyan-950 opacity-30 rounded-full blur-3xl" />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-950 opacity-25 rounded-full blur-3xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        </div>
        <Chat client={chatClient} theme="messaging dark">
          <ChannelComponent channel={chat}>
            <ScrollArea className="flex-1 flex flex-col h-full">
              <div className="relative z-10 border-b border-border bg-background/90 backdrop-blur p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{chat.state.watcher_count} online</span>
                </div>
              </div>
              <ScrollArea className="relative z-10 border rounded-lg p-4 flex-1 min-h-0 overflow-auto">
                <MessageList Message={MessageOutput} />
              </ScrollArea>
              <MessageInput Input={() => <CustomMessageInput />} />
            </ScrollArea>
            <Thread />
          </ChannelComponent>
        </Chat>
      </Card>
    </div>
  )
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const navigate = useNavigate()

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={() => navigate('/')} />
    </>
  )
}
