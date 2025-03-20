'use client'

import { useDeferredValue, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// You can use it only in client side
export const useSearchValue = () => {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [router])

  return {
    searchQuery: deferredQuery,
    setSearchQuery: setQuery,
  }
}
