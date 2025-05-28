import { MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export const EmptyChatState = () => (
  <Card className="flex flex-col items-center justify-center h-full bg-muted/40 border-0 shadow-none">
    <MessageCircle className="w-10 h-10 text-muted-foreground mb-4" />
    <div className="text-lg font-semibold text-muted-foreground mb-1">No messages yet</div>
    <div className="text-sm text-muted-foreground">Start the conversation!</div>
  </Card>
)
