'use client'

import { useDeferredValue, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from './Search'

export const Friends = ({ friends }: { friends: User[] }) => {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredUsers = friends.filter((friend) =>
    friend.name?.toLowerCase().includes(deferredQuery.toLowerCase()) || friend.email?.toLowerCase().includes(deferredQuery.toLowerCase()),
  )

  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [router])

  return (
    <>
      <div className="p-2 border-b-2 border-slate-800">
        <Search onSearch={setQuery}/>
      </div>
      <ScrollArea className="friends__list">
        <ul>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
              <li className="channels__item" key={item.name}>{item.name}</li>
            ))
          ) : (
            <li className="text-gray-400 p-2">No results found</li>
          )}
        </ul>
      </ScrollArea>
    </>
  )
}
