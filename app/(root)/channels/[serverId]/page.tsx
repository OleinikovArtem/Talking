import { MainLayout } from '@/components/MainLayout'

export default async function ChannelPage({ params }: { params: Promise<{ serverId: string }> }) {
  const { serverId } = await params

  return (
    <MainLayout serverId={serverId}>
      <div className='flex justify-center items-center w-full'>
        <h2 className='text-2xl text-center'>Hello! Please, choose a channel to start or continue a conversation...</h2>
      </div>
    </MainLayout>
  );
}
