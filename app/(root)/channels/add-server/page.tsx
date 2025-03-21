import { auth } from '@clerk/nextjs/server'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateServerForm } from '@/components/CreateServerForm'
import { MainLayout } from '@/components/MainLayout'
import { ME_ID } from '@/constants/base'
import { SearchServer } from '@/components/SearchServer'
import { redirect } from 'next/navigation'
import { getUser } from '@/actions/user'


export default async function AddServerPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const user = await getUser(userId)
  if (!user) redirect('/')

  return (
    <MainLayout serverId={ME_ID}>
      <div className="w-1/2 m-auto">
        <h2 className="text-2xl mb-4">Hey, you can create a new server or find an existing one</h2>

        <Tabs defaultValue="search">
          <TabsList className="bg-slate-800 w-full">
            <TabsTrigger className="text-white data-[state=active]:bg-slate-700 cursor-pointer" value="search">Search Servers</TabsTrigger>
            <TabsTrigger className="text-white data-[state=active]:bg-slate-700 cursor-pointer" value="create">Create New Server</TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <SearchServer userId={user.id!} />
          </TabsContent>
          <TabsContent value="create">
            <CreateServerForm userId={user.id!}/>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
