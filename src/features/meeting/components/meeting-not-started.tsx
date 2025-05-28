import { CalendarDays, Clock, Users } from 'lucide-react'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSearchParams } from 'react-router'
import { useState } from 'react'

export const MeetingNotStarted = () => {
  const [searchParams] = useSearchParams()
  const [meetingDetails, _] = useState({
    title: searchParams.get('title') || 'Untitled Meeting',
    startsAt: new Date(searchParams.get('startsAt') || ''),
    hostName: searchParams.get('hostName') || 'Unknown Host',
  })

  return (
    <div className="flex h-full w-full items-center justify-center p-4 ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">{meetingDetails.title}</CardTitle>
          <CardDescription>This meeting hasn't started yet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <CalendarDays className="h-5 w-5" />
              <span>{format(meetingDetails.startsAt, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>{format(meetingDetails.startsAt, 'h:mm a')}</span>
            </div>
            {meetingDetails.hostName && (
              <div className="flex items-center space-x-4 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>Hosted by {meetingDetails.hostName}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              You'll be able to join the meeting when the host starts it.
            </p>
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
