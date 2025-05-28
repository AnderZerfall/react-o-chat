import { UserCredentials } from '@/features/auth/interfaces/UserCredentials'
import { api } from './jwt.service'

export interface JwtToken {
  access_token: string
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/current')
  return response.data
}

export const login = async (credentials: UserCredentials): Promise<JwtToken> => {
  const response = await api.post('/auth/sign-in', credentials)
  return response.data
}
