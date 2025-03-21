'use client'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { createMessage } from '@/actions/channel'


const createMessageSchema = z.object({
  channelId: z.string(),
  userId: z.string(),
  content: z.string(),
})

export const MessageInput = ({ channelId, userId }: { channelId: string, userId: string }) => {
  const form = useForm<z.infer<typeof createMessageSchema>>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      content: '',
      channelId,
      userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof createMessageSchema>) => {
    try {
      const formData = new FormData()
      formData.append('content', data.content)
      formData.append('channelId', data.channelId)
      formData.append('userId', data.userId)

      await createMessage(formData)
    } catch (error) {
      console.error('Error creating server:', error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex'>
          <Input name="userId" hidden defaultValue={userId}/>
          <Input name="channelId" hidden defaultValue={channelId}/>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className='w-full border-0'>
                <FormControl>
                  <Input {...field} className="flex-1 placeholder:text-slate-200" placeholder="Type a message"
                         required/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <Button type="submit" variant="outline" className="bg-interit" size="sm">
            Send
          </Button>
        </form>
      </Form>
    </>
  )
}
