import { useQuery } from '@tanstack/react-query'
import type { User } from '../interfaces/User'
import { getCurrentUser } from '../../../service/user.service'

export const QUERY_USER_KEY = 'current_user'

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: [QUERY_USER_KEY],
    queryFn: getCurrentUser,
  })
}
