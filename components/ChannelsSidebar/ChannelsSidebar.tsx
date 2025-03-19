import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'

import { Input } from '@/components/ui/input'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const mockItems = Array.from({ length: 25 }).map((_, i) => ` test Item ${i + 1}`)

export const ChannelsSidebar = async () => {
  const { userId } = await auth()

  if (!userId) redirect('/')
  const user = await currentUser()

  return (
    <div className="bg-slate-700 min-w-60">
      <div className='p-2 border-b-2 border-slate-800'>
        <Input className="border-none text-white bg-slate-800"
               type="string" placeholder="Find or start a conversation"
        />
      </div>
      <ScrollArea className='channels__list'>
        <ul>
          {mockItems.map(item => (
            <li className="channels__item" key={item}>{item}</li>
          ))}
        </ul>
      </ScrollArea>
      <div className="p-2 bg-slate-800">
        <Avatar className='w-[40px] h-[40px]' >
          <AvatarImage src={user?.imageUrl} alt={user?.username || ''} />
          <AvatarFallback className="bg-interit">ME</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
