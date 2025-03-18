import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { ME_ID } from '@/constants/base'

export const ServersSidebar = () => {
  return (
    <header className="bg-slate-800 min-w-18 pt-4">
      <nav>
        <ul className="flex flex-col gap-4 items-center justify-center">
          <li className="server-sidebar__item">
            <Link href={`/channels/${ME_ID}`}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
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
