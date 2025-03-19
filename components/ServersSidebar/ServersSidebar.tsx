import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs/server'
import { getUser } from '@/actions/user'
import { prisma } from '@/lib/prisma'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ME_ID } from '@/constants/base'
import { Plus } from 'lucide-react'

export const ServersSidebar = async () => {
  const { userId } = await auth()

  if (!userId) redirect('/')
  const user = await getUser(userId)

  const servers = await prisma.server.findMany({ where: { ownerId: user?.id } })

  return (
    <header className="bg-slate-800 min-w-18 pt-4">
      <nav>
        <TooltipProvider>
          <ul className="flex flex-col gap-4 items-center justify-center">
            <li className="server-sidebar__item">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/channels/${ME_ID}`}>
                    <Avatar className="w-[48px] h-[48px]">
                      <AvatarImage src={user?.image || ''} alt={user?.name || ''}/>
                      <AvatarFallback className="bg-interit">ME</AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{user?.name}</TooltipContent>
              </Tooltip>
            </li>

            <hr className="divider w-10"/>

            {servers.map(server => (
              <li className="server-sidebar__item" key={server.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/channels/${server.id}`} className="w-[48px] h-[48px] flex">
                      <Image src={server.image || 'https://placehold.co/24x24'}
                             alt={server.name}
                             width={24} height={24}
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{server?.name}</TooltipContent>
                </Tooltip>
              </li>
            ))}

            <hr className="divider w-10"/>
            <li className="server-sidebar__item">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/channels/create"><Plus/></Link>
                </TooltipTrigger>
                <TooltipContent side="right">Create new Server</TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </TooltipProvider>
      </nav>
    </header>
  )
}
