import { prisma } from '@/lib/prisma'

export const createUser = async (data: { email: string; name: string; image: string; clerkId: string; }) => {
  const newUser = await prisma.user.upsert({
    where: { email: data.email },
    update: {},
    create: {
      name: data.name,
      email: data.email,
      image: data.image,
      clerkId: data.clerkId,
    },
  })

  console.log('New user has been created: ', newUser.email, newUser.id)
  return newUser
}

export const getUser = async (clerkId: string) => {
  return  prisma.user.findFirst({ where: { clerkId: clerkId } })
}
