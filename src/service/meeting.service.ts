import { Call } from '@/features/meeting/interfaces/Call'
import { api } from './jwt.service'

export const scheduleMeeting = async (call: Call) => {
  const response = await api.post('/meeting/schedule', call)
  return response.data
}
