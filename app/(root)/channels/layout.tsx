import { ServersSidebar } from '@/components/ServersSidebar'
import { ChannelsSidebar } from '@/components/ChannelsSidebar'

export default function ChannelsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex h-screen'>
      <ServersSidebar />
      <ChannelsSidebar />
      {children}
    </div>
  );
}
