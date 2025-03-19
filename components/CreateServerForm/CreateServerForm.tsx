import Form from 'next/form'

import { createServer } from '@/actions/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const CreateServerForm = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 m-auto bg-slate-800 px-16 py-8 rounded-lg">
      <h1 className="text-3xl mb-6">Create a new Server!</h1>
      <Form action={createServer} className="w-full gap-4 flex flex-col">
        <Input className="placeholder:text-slate-400" name="name" required placeholder="Server name"/>
        <Input className="placeholder:text-slate-400" name="image" type="url"
               placeholder="Image URL, example: https://placehold.co/24x24"/>
        <Input name="userId" hidden defaultValue={userId}/>
        <Button variant="outline" className="text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer">Create</Button>
      </Form>
    </div>
  )
}
