import { useMessageContext, Avatar as StreamAvatar } from 'stream-chat-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export const MessageOutput = (props) => {
  const { message, isMyMessage } = useMessageContext()
  const imageAttachment = message?.attachments?.find((att) => att.type === 'image')

  const isMine = isMyMessage()
  return (
    <div className={cn('flex items-end gap-3 mb-6', isMine ? 'justify-end' : 'justify-start')}>
      {!isMine && <StreamAvatar image={message.user?.image} name={message.user?.name || 'User'} size={40} />}
      <div
        className={cn(
          'max-w-md rounded-2xl px-6 py-4 backdrop-blur-md bg-background/70 border border-border',
          isMine ? 'bg-primary/60 text-primary-foreground ml-auto' : 'bg-muted/60 text-foreground',
        )}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        {imageAttachment && (
          <img
            src={imageAttachment.image_url || imageAttachment.thumb_url}
            alt={imageAttachment.fallback || 'attachment'}
            className="rounded-lg mb-3 max-h-64 object-cover"
          />
        )}
        <div className="text-base font-medium break-words">{message.text}</div>
        <div className="text-xs text-muted-foreground mt-2 flex justify-between gap-2">
          <span>{message.user?.name || 'Unknown'}</span>
          <span>{message.created_at ? format(new Date(message.created_at), 'HH:mm') : ''}</span>
        </div>
      </div>
      {isMine && <StreamAvatar image={message.user?.image} name={message.user?.name || 'User'} size={40} />}
    </div>
  )
}
