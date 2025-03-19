import { redirect } from 'next/navigation'
import { ME_ID } from '@/constants/base'

export default function NotFound() {

  redirect(`/channels/${ME_ID}`)

  return (
    <div>NotFound</div>
  )
}
