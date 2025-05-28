import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLoginUser } from '../hooks/userLoginUser'
import { Button } from '@/components/ui/button'

const schema = z.object({
  name: z.string().min(2, { message: 'Username must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

type FormValues = z.infer<typeof schema>

export const Auth = () => {
  const loginMutation = useLoginUser()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  function onSubmit(data: FormValues) {
    loginMutation.mutateAsync(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Joining...
            </>
          ) : (
            'Join Meeting'
          )}
        </Button>
      </form>
    </Form>
  )
}
