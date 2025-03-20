import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { ME_ID } from '@/constants/base'
import { getFriends, getUser } from '@/actions/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Channels } from './Channels'
import { Friends } from '@/components/ChannelsSidebar/Friends'
import { getChannels } from '@/actions/channel'


export const ChannelsSidebar = async ({ serverId }: { serverId: string }) => {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const user = await getUser(userId)

  const isMainChannel = decodeURIComponent(serverId) === ME_ID
  let _serverId = serverId

  if (isMainChannel) {
    user?.id && (_serverId = user.id)
  }

  const [channels, friends] = await Promise.all([
    getChannels(_serverId),
    getFriends(user?.id!),
  ])

  return (
    <div className="bg-slate-700 min-w-60">
      {isMainChannel ? <Friends friends={friends}/> : <Channels channels={channels}/>}
      <div className="p-2 bg-slate-800">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={user?.image || ''} alt={user?.name || ''}/>
          <AvatarFallback className="bg-inherit">ME</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
