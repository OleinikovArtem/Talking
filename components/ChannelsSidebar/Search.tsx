'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

type SearchProps = { onSearch?: (query: string) => void }

export const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.(query)
      }}
    >
      <Input
        className="border-none text-white bg-slate-800"
        placeholder="Find or start a conversation"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
