import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Call } from '@/features/meeting/interfaces/Call'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { useMeetingContext } from '@/features/meeting/hooks/useMeetingContext'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export const ScheduleMeeting = () => {
  const { scheduleMeeting } = useMeetingContext()
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const form = useForm({
    defaultValues: {
      title: '',
      startTime: new Date(),
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log('Form submitted with data:', data)
    const call: Call = {
      title: data.title,
      startsAt: data.startTime,
    }

    const generatedLink = (await scheduleMeeting(call)) || ''
    setLink(generatedLink)

    console.log(link)
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Meeting title" {...field} className="w-full" />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={classNames(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
        {link ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input readOnly value={link} className="w-full font-mono text-sm" />
              <Button type="button" variant="outline" size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button type="button" variant="secondary" className="w-full" onClick={() => form.reset()}>
              Schedule Another Meeting
            </Button>
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Schedule Meeting
          </Button>
        )}
      </form>
    </Form>
  )
}
