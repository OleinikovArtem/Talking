
import { auth } from '@clerk/nextjs/server'
import { AuthForm } from '@/components/AuthForm'
import { redirect } from 'next/navigation'
import { ME_ID } from '@/constants/base'

export default async function RootPage() {
  const { userId } = await auth()

  if (userId) redirect(`/channels/${ME_ID}`)

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='text-center bg-slate-800 rounded-lg p-8'>
        <h1 className='text-3xl font-bold mb-4'>Welcome to the <i>"Talking"</i> app!</h1>
        <p className='mb-10'>To continue, please sign in or sign up using buttons below</p>
        <AuthForm />
      </div>
    </div>
  )
}
