'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

type SearchProps = {
  onSearch?: (query: string) => void;
  placeholder: string;
  className?: string;
}

export const Search = ({ onSearch, placeholder, className }: SearchProps) => {
  const [query, setQuery] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.(query)
      }}
    >
      <Input
        className={className}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
