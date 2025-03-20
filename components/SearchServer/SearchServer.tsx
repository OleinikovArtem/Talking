'use client'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Server } from '.prisma/client'

import { useSearchValue } from '@/app/hooks/useSearchValue'
import { Search } from '@/components/ChannelsSidebar/Search'
import { Button } from '@/components/ui/button'

export const SearchServer = ({ userId }: { userId: string }) => {
  const { searchQuery, setSearchQuery } = useSearchValue()
  const [servers, setServers] = useState<(Server & { _count: { memberships: number } })[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/servers?search=${searchQuery}&userId=${userId}`)
        const data = await res.json()
        setServers(data)
      } catch (error) {
        console.error('Error fetching servers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServers()
  }, [searchQuery, userId])

  const joinServer = async (serverId: string) => {
    try {
      const res = await fetch('/api/servers/join', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serverId, userId }),
      })

      const data = await res.json()
      if (data.success) {
        console.log('Joined server successfully!')
        redirect(`/channels/${serverId}`)
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error('Failed to join server:', error)
    }
  }

  return (
    <div>
      <Search className="border-none text-white bg-slate-800 mb-4"
              onSearch={setSearchQuery} placeholder="Server name"/>

      {loading && <div className="text-slate-300 p-2">Loading...</div>}

      <ul hidden={loading}>
        {servers.length > 0 ? (
          servers.map((server) => (
            <li key={server.id} className="text-slate-100 p-2 flex justify-between hover:bg-slate-700 rounded-lg items-center">
              <div className="flex gap-2">
                <Image
                  src={server.image || ''} width={32} height={32}
                  alt={server.name || ''} className="rounded-full"/>
                {server.name}
              </div>
              <div className="ml-auto flex gap-2 items-center">
                <Button className='cursor-pointer bg-slate-800 hover:bg-slate-900' onClick={() => joinServer(server.id)}>Connect</Button>
                (Members: {server._count.memberships + 1})
              </div>
            </li>
          ))
        ) : (
          <li key='server-not-found' className="text-slate-100 p-2">No results found</li>
        )}
      </ul>
    </div>
  )
}
