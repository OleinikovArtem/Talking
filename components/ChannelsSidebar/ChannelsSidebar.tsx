import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { ME_ID } from '@/constants/base'
import { getFriends, getUser } from '@/actions/user'

import { Channels } from './Channels'
import { Friends } from '@/components/ChannelsSidebar/Friends'
import { getChannels } from '@/actions/channel'
import { SignedIn, UserButton } from '@clerk/nextjs'


export const ChannelsSidebar = async ({ serverId }: { serverId: string }) => {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const user = await getUser(userId)
  if (!user) redirect('/')

  const isMainChannel = decodeURIComponent(serverId) === ME_ID
  let _serverId = serverId

  if (isMainChannel) {
    _serverId = user.id
  }

  const [channels, friends] = await Promise.all([
    getChannels(_serverId),
    getFriends(user.id),
  ])

  return (
    <div className="bg-slate-700 min-w-60 border-r border-l border-slate-600">
      {isMainChannel ? <Friends friends={friends}/> : <Channels channels={channels}/>}
      <div className="p-2 bg-slate-800 h-[55px] flex items-center justify-between">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}
