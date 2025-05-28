import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { Lobby } from './features/lobby/lobby'
import { ThemeProvider } from './components/ui/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MeetingProvider } from './features/meeting/context/meeting.context'
import { MeetingRoom } from './features/meeting/meeting'
import { Toaster } from 'react-hot-toast'
import { MeetingNotStarted } from './features/meeting/components/meeting-not-started'

function Layout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MeetingProvider>
          <div className="min-h-screen flex items-center justify-center">
            <Outlet />
            <Toaster />
          </div>
        </MeetingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Lobby />} />
          <Route path="call" element={<MeetingRoom />} />
          <Route path="scheduled/:callId" element={<MeetingNotStarted />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
