'use client'

import { useDeferredValue, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Channel } from '@prisma/client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from './Search'

export const Channels = ({ channels }: { channels: Channel[] }) => {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredItems = channels.filter((item) =>
    item.name.toLowerCase().includes(deferredQuery.toLowerCase()),
  )

  const router = useRouter()
  useEffect(() => { router.refresh() }, [router])

  return (
    <>
      <div className="p-2 border-b-2 border-slate-800">
        <Search onSearch={setQuery}/>
      </div>
      <ScrollArea className="channels__list">
        <ul>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
