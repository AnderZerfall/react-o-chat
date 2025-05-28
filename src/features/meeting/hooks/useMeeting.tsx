import { useManageChat } from '@/features/meeting/hooks/useManageChat'
import { CALL_TYPE, useManageCall } from './useManageCall'
import { getTokenFromCookies } from '@/service/cookie.service'
import { useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate, useSearchParams } from 'react-router'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import toast from 'react-hot-toast'
import { Call } from '@stream-io/video-client'
import { Channel } from 'stream-chat'
import { Call as CallType } from '../interfaces/Call'
import { MeetingNotStarted } from '../components/meeting-not-started'
import { isFuture } from 'date-fns'

export const useMeeting = () => {
  const navigate = useNavigate()
  const { data: user, isFetching: isLoading } = useCurrentUser()
  const [searchParams, setSearchParams] = useSearchParams()
  const token = getTokenFromCookies() || ''
  const apiKey = import.meta.env.VITE_STREAM_API_KEY
  const [call, setCall] = useState<Call>()
  const [chat, setChat] = useState<Channel>()

  const callId = useMemo(() => {
    const existingCallId = searchParams.get('callId')
    if (existingCallId) return existingCallId

    const newCallId = uuid()
    setSearchParams({ callId: newCallId }, { replace: true })
    return newCallId
  }, [searchParams, setSearchParams])

  const { client: videoClient, startCall } = useManageCall({
    user,
    token,
    apiKey,
    roomId: callId,
  })

  const { client: chatClient, startChat } = useManageChat({
    user,
    token,
    apiKey,
    roomId: callId,
  })

  const showScheduledMeeting = async (currentCall: Call) => {
    try {
      const callData = await currentCall.get()

      const startDate = callData.call.starts_at ? new Date(callData.call.starts_at) : null
      const isScheduled = startDate ? isFuture(startDate) : false

      if (startDate && isScheduled) {
        const params = new URLSearchParams({
          title: callData.call.custom?.title || 'Meeting',
          startsAt: startDate.toISOString(),
          hostName: callData.call.created_by.name || 'Host',
        })

        navigate(`/scheduled/${callId}?${params.toString()}`)
      }
    } catch {
      console.log()
    }
  }

  const connectClients = async () => {
    if (!isLoading && !user) {
      navigate(
        {
          pathname: '/',
          search: callId ? `?callId=${callId}` : '',
        },
        {
          replace: true,
        },
      )
    }

    try {
      const currentCall = startCall()
      const currentChannel = startChat()

      if (currentCall) {
        await showScheduledMeeting(currentCall)
        await currentCall.join({ create: true })
        setCall(currentCall)
      }

      if (currentChannel) {
        await currentChannel.watch()
        setChat(currentChannel)
      }
    } catch {
      toast.error('Failed to connect to call or chat. Please try again.')
    }
  }

  const scheduleMeeting = async (call: CallType) => {
    if (!user) {
      throw new Error('User is not logged in. Please log in to schedule a meeting.')
    }

    await videoClient.connectUser(
      {
        id: user.user_id,
        name: user.name,
      },
      token,
    )

    const currentCall = videoClient.call(CALL_TYPE, callId)
    setCall(currentCall)

    try {
      const response = await currentCall.getOrCreate({
        data: {
          starts_at: call.startsAt.toISOString(),
          custom: {
            title: call.title || `Meeting with ${user.name}`,
          },
        },
      })

      console.log(response)

      return createLink(response.call.id)
    } catch (error) {
      toast.error(`Failed to schedule meeting: ${error.message}`)
    }
  }

  const createLink = (id: string) => {
    if (id) {
      return `${window.location.origin}/call?callId=${id}`
    }

    throw new Error('Call ID is required to create a link.')
  }

  return {
    call,
    chat,
    connectClients,
    videoClient,
    chatClient,
    scheduleMeeting,
    isLoading,
  }
}
