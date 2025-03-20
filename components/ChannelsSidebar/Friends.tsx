'use client'
import { User } from '@prisma/client'

import { useSearchValue } from '@/app/hooks/useSearchValue'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from './Search'

export const Friends = ({ friends }: { friends: User[] }) => {
  const { searchQuery, setSearchQuery } = useSearchValue()

  const filteredUsers = friends.filter((friend) =>
    friend.name?.toLowerCase().includes(searchQuery.toLowerCase()) || friend.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <div className="p-2 border-b-2 border-slate-800">
        <Search className="border-none text-white bg-slate-800"
                onSearch={setSearchQuery} placeholder="Find or start a conversation"/>
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
