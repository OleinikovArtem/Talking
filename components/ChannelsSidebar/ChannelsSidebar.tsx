import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'

import { ME_ID } from '@/constants/base'
import { prisma } from '@/lib/prisma'
import { getUser } from '@/actions/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Channels } from './Channels'


export const ChannelsSidebar= async ({ serverId }: { serverId: string }) => {
  const { userId } = await auth()
  if (!userId) redirect('/')

  let _serverId = serverId

  if (serverId === ME_ID) {
    const user = await getUser(userId)
    user?.id && (_serverId = user.id)
  }

  const user = await currentUser()
  const channels = await prisma.channel.findMany({ where: { serverId: _serverId } })

  return (
    <div className="bg-slate-700 min-w-60">
      <Channels channels={channels} />
      <div className="p-2 bg-slate-800">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={user?.imageUrl} alt={user?.username || ''}/>
          <AvatarFallback className="bg-inherit">ME</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
