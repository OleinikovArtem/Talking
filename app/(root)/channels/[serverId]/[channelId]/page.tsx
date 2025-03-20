import { MainLayout } from '@/components/MainLayout'

export default async function ChannelPage({ params }: { params: Promise<{ serverId: string; channelId: string }> }) {
  const { serverId, channelId } = await params

  return (
    <MainLayout serverId={serverId}>
      <h1>Channel page {channelId}</h1>
    </MainLayout>
  );
}
