import { auth } from '@clerk/nextjs/server'

import { ServersSidebar } from '@/components/ServersSidebar'
import { ChannelsSidebar } from '@/components/ChannelsSidebar'
import { CreateServerForm } from '@/components/CreateServerForm'

export default async function CreatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { userId } = await auth()

  return (
    <>
      <ServersSidebar />
      <ChannelsSidebar serverId={id} />
      <CreateServerForm userId={userId!} />
    </>
  );
}
