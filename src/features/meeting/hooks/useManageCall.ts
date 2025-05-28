import { StreamVideoClient } from '@stream-io/video-react-sdk'
import toast from 'react-hot-toast'
import { User } from '@/features/auth/interfaces/User'

export const CALL_TYPE = 'default'

interface UseManageCallProps {
  user?: User
  token: string
  apiKey: string
  roomId: string
}

export const useManageCall = ({ user, token, apiKey, roomId }: UseManageCallProps) => {
  const client = new StreamVideoClient({ apiKey })

  const startCall = () => {
    try {
      if (!user) {
        throw new Error('User is not logged in. Please log in to start a call.')
      }

      if (!roomId) {
        throw new Error('Room, id is not provided')
      }

      if (user) {
        client.connectUser({ id: user.user_id, name: user.name }, token)
        return client.call(CALL_TYPE, roomId)
      }
    } catch (error) {
      toast.error(`Failed to start the call: ${error.message}`)
    }
  }

  const endCall = () => {
    try {
      client.disconnectUser()
    } catch (error) {
      toast.error(`Failed to end the call: ${error.message}`)
    }
  }

  return {
    client,
    startCall,
    endCall,
  }
}
