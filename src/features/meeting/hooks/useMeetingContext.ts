import { useContext } from 'react'
import { MeetingContext, MeetingContextProps } from '../context/meeting.context'

export const useMeetingContext = () => useContext<MeetingContextProps>(MeetingContext)
