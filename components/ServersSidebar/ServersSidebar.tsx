import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { ME_ID } from '@/constants/base'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const ServersSidebar = async () => {
  const { userId } = await auth()

  if (!userId) redirect('/')
  const user = await currentUser()

  const users = await prisma.user.findMany({})
  console.table(users)
  return (
    <header className="bg-slate-800 min-w-18 pt-4">
      <nav>
        <ul className="flex flex-col gap-4 items-center justify-center">
          <li className="server-sidebar__item">
            <Link href={`/channels/${ME_ID}`}>
              <Avatar className='w-[48px] h-[48px]' >
                <AvatarImage src={user?.imageUrl} alt={user?.username || ''} />
                <AvatarFallback className="bg-interit">ME</AvatarFallback>
              </Avatar>
            </Link>
          </li>

          <hr className="divider w-10"/>

          <li className="server-sidebar__item">
            <Link href={`/channels/id_1`} className="w-full">
              <Image src="https://placehold.co/24x24" alt="server title 1" width={24} height={24}/>
            </Link>
          </li>
          <li className="server-sidebar__item">
            <Link href={`/channels/id_2`} className="w-full">
              <Image src="https://placehold.co/24x24" alt="server title 1" width={24} height={24}/>
            </Link>
          </li>
          <li className="server-sidebar__item">
            <Link href={`/channels/id_3`} className="w-full">
              <Image src="https://placehold.co/24x24" alt="server title 1" width={24} height={24}/>
            </Link>
          </li>

          <hr className="divider w-10"/>
          <li className="server-sidebar__item">
            <Link href="/channels/create">
              <Plus/>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
