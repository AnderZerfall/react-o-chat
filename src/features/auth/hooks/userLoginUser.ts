import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router'
import { UserCredentials } from '../interfaces/UserCredentials'
import { setTokenCookie } from '@/service/cookie.service'
import { QUERY_USER_KEY } from './useCurrentUser'
import toast from 'react-hot-toast'
import { login } from '@/service/user.service'

export const useLoginUser = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return useMutation({
    mutationFn: (credentials: UserCredentials) => login(credentials),
    onSuccess: (data) => {
      setTokenCookie(data.access_token)

      const callId = searchParams.get('callId')

      navigate(
        {
          pathname: '/call',
          search: callId ? `?callId=${callId}` : '',
        },
        {
          replace: true,
        },
      )

      queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] })
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`)
    },
  })
}
