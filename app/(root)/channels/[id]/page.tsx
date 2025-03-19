import { ServersSidebar } from '@/components/ServersSidebar'
import { ChannelsSidebar } from '@/components/ChannelsSidebar'
import { Dashboard } from '@/components/Dashboard'

export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className='flex h-screen'>
      <ServersSidebar />
      <ChannelsSidebar serverId={id} />
      <Dashboard />
    </div>
  );
}
