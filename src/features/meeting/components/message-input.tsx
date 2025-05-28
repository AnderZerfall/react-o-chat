import {
  AttachmentPreviewList,
  CooldownTimer,
  LinkPreviewList,
  QuotedMessagePreview,
  SendButton,
  SimpleAttachmentSelector,
  TextareaComposer,
  useMessageInputContext,
} from 'stream-chat-react'
import { Paperclip, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactElement, ReactNode, useRef } from 'react'

const SendButtonWithCooldown = () => {
  const { handleSubmit, cooldownRemaining, setCooldownRemaining } = useMessageInputContext()
  return cooldownRemaining ? (
    <CooldownTimer cooldownInterval={cooldownRemaining} setCooldownRemaining={setCooldownRemaining} />
  ) : (
    <SendButton
      sendMessage={handleSubmit}
      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow transition w-10 h-10 flex items-center justify-center"
    >
      <Send className="w-5 h-5" />
    </SendButton>
  )
}

export const CustomMessageInput = () => {
  const ref = useRef<{ openFilePicker: () => void } | null>(null)
  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto p-4 grid gap-3',
        'rounded-2xl border border-border bg-background/80 backdrop-blur-lg shadow-2xl',
      )}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.22)',
        border: '1.5px solid rgba(255,255,255,0.10)',
      }}
    >
      {/* Attachment Button */}
      <div className="flex items-center">
        <SimpleAttachmentSelector>
          {(openFilePicker) => (
            <button
              type="button"
              className="rounded-full p-2 bg-muted hover:bg-muted/70 transition shadow border border-border"
              title="Attach file"
              onClick={openFilePicker}
            >
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </SimpleAttachmentSelector>
      </div>
      {/* Message Input */}
      <div className="flex flex-col gap-1">
        <TextareaComposer
          className="bg-transparent border-none focus:ring-0 focus-visible:ring-0 text-base resize-none min-h-[36px] max-h-40"
          rows={1}
          placeholder="Type your message…"
        />
        <LinkPreviewList />
        <AttachmentPreviewList />
      </div>
      {/* Send Button */}
      <div className="flex items-center justify-end">
        <SendButtonWithCooldown />
      </div>
    </div>
  )
}
