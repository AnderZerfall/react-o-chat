import { Auth } from '../auth/components/auth'
import { ScheduleMeeting } from './components/schedule.meeting'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Lobby = () => {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to React-O-Chat</CardTitle>
          <CardDescription>Join a meeting or schedule a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="join" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="join">Join Meeting</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Meeting</TabsTrigger>
            </TabsList>
            <TabsContent value="join" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <Auth />
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <ScheduleMeeting />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
