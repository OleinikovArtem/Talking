import { Dashboard } from '@/components/Dashboard'
import { MainLayout } from '@/components/MainLayout'

export default async function ChannelPage({ params }: { params: Promise<{ serverId: string }> }) {
  const { serverId } = await params

  return (
    <MainLayout serverId={serverId}>
      <Dashboard />
    </MainLayout>
  );
}
