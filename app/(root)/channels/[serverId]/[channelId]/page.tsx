import { MainLayout } from '@/components/MainLayout'
import { ScrollArea } from '@/components/ui/scroll-area'

import { getMessages } from '@/actions/channel'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { MessageInput } from '@/components/MessageInput'

export default async function ChannelPage({ params }: { params: Promise<{ serverId: string; channelId: string }> }) {
  const { serverId, channelId } = await params

  const messages = await getMessages(channelId)

  return (
    <MainLayout serverId={serverId}>
      <div className="flex flex-col h-screen w-full">
        <ScrollArea className="flex-1 overflow-y-auto py-4">

          {messages.map((msg, index) => {
            const prevDate = index > 0 ? messages[index - 1].createdAt.toDateString() : null;
            const currentDate = msg.createdAt.toDateString();
            const showDateDivider = prevDate !== currentDate;

            return (
              <div key={msg.id}>
                {showDateDivider && (
                  <div className="text-center text-sm text-gray-400 my-2">{currentDate}</div>
                )}
                <div className="flex items-start space-x-2 hover:bg-slate-800 pl-4 pb-2">
                  <Avatar className='text-slate-600 mt-2'>
                    <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                    {/*TODO: change to user name "Arte Ole" => "AO"*/}
                    <AvatarFallback>AO</AvatarFallback>
                  </Avatar>
                  <div className="p-2 rounded-lg">
                    <p>Art Ole: <span>{currentDate}</span></p>
                    <p className="text-sm">Hello everyone! This is a test message</p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollArea>
        <footer className="flex items-center space-x-2 p-2 bg-slate-800 h-[55px]">
          <MessageInput />
        </footer>
      </div>
    </MainLayout>
  )
}
