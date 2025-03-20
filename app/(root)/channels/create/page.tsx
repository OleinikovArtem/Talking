import { auth } from '@clerk/nextjs/server'

import { CreateServerForm } from '@/components/CreateServerForm'
import { MainLayout } from '@/components/MainLayout'
import { ME_ID } from '@/constants/base'

export default async function CreatePage() {
  const { userId } = await auth()

  return (
    <MainLayout serverId={ME_ID}>
      <CreateServerForm userId={userId!}/>
    </MainLayout>
  )
}
