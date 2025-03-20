'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { createServer } from '@/actions/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const createServerSchema = z.object({
  name: z.string().min(3, 'Server name must be at least 3 characters'),
  image: z.string().url('Invalid image URL').optional(),
  userId: z.string().min(1, 'User ID is required'),
})

export const CreateServerForm = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof createServerSchema>>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      name: '',
      image: '',
      userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof createServerSchema>) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('userId', data.userId)

      if (data.image) {
        formData.append('image', data.image)
      }

      await createServer(formData)
    } catch (error) {
      console.error('Error creating server:', error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center m-auto bg-slate-800 px-16 py-8 rounded-lg">
      <h1 className="text-3xl mb-6">Create a new Server!</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 flex flex-col">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Server Name</FormLabel>
                <FormControl>
                  <Input className="placeholder:text-slate-400" placeholder="Lorem Ipsum" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input className="placeholder:text-slate-400" placeholder="https://example.com/image.png" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <Input name="userId" hidden defaultValue={userId}/>

          <Button type="submit" variant="outline"
                  className="text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer">
            Create
          </Button>

        </form>
      </Form>
    </div>
  )
}
