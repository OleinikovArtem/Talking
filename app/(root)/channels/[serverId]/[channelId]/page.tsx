import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageInput } from '@/components/MessageInput'
import { MainLayout } from '@/components/MainLayout'

import { getUser } from '@/actions/user'
import { getMessages } from '@/actions/channel'

import { getUserInitials } from '@/lib/utils'

export default async function ChannelPage({ params }: { params: Promise<{ serverId: string; channelId: string }> }) {
  const { serverId, channelId } = await params
  const { userId } = await auth()
  if (!userId) redirect('/')

  const [user, messages] = await Promise.all([getUser(userId), getMessages(channelId)])

  return (
    <MainLayout serverId={serverId}>
      <div className="flex flex-col h-screen w-full">
        <ScrollArea className="flex-1 overflow-y-auto py-4">

          {messages.map((msg, index) => {
            const prevDate = index > 0 ? messages[index - 1].createdAt.toDateString() : null
            const currentDate = msg.createdAt.toDateString()
            const formattedTime = msg.createdAt.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });

            const showDateDivider = prevDate !== currentDate

            return (
              <div key={msg.id}>
                {showDateDivider && (
                  <div className="text-center text-sm text-gray-400 my-2">{currentDate}</div>
                )}
                <div className="flex items-start space-x-2 hover:bg-slate-800 pl-4 pb-2">
                  <Avatar className="text-slate-600 mt-3">
                    <AvatarImage src={msg.user.image || ''} alt="User Avatar"/>
                    <AvatarFallback>{getUserInitials(msg.user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="p-2 rounded-lg">
                    <p>{msg.user.name}: <i className="text-xs">{formattedTime}</i></p>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollArea>
        <footer className="flex items-center space-x-2 p-2 bg-slate-800 h-[55px]">
          <MessageInput userId={user?.id!} channelId={channelId}/>
        </footer>
      </div>
    </MainLayout>
  )
}
