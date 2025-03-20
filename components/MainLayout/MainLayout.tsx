import { ServersSidebar } from '@/components/ServersSidebar'
import { ChannelsSidebar } from '@/components/ChannelsSidebar'

export const MainLayout = ({ children, serverId }: { children: React.ReactNode, serverId: string }) => {
  return (
    <div className="flex h-screen w-screen">
      <ServersSidebar/>
      <ChannelsSidebar serverId={serverId}/>
      {children}
    </div>
  )
}
