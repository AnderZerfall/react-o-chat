import { User } from '@/features/auth/interfaces/User'
import toast from 'react-hot-toast'
import { StreamChat } from 'stream-chat'

interface UseManageChatProps {
  user?: User
  token: string
  apiKey: string
  roomId: string
}

export const useManageChat = ({ user, token, apiKey, roomId }: UseManageChatProps) => {
  const client = new StreamChat(apiKey)

  const startChat = () => {
    try {
      if (!user) {
        throw new Error('User is not logged in. Please log in to start a call.')
      }

      if (!roomId) {
        throw new Error('Room, id is not provided')
      }

      if (user) {
        client.connectUser({ id: user.user_id, name: user.name }, token)

        const channel = client.channel('livestream', roomId)
        return channel
      }
    } catch (error) {
      toast.error(`Failed to connect chat: ${error.message}`)
    }
  }

  const endChat = async () => {
    try {
      client.disconnectUser()
    } catch (error) {
      toast.error(`Failed to end the call: ${error.message}`)
    }
  }

  return {
    client,
    startChat,
    endChat,
  }
}
