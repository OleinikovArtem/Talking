import { prisma } from '@/lib/prisma'

export const createUser = async (data: { email: string; name: string; image: string; }) => {
  const newUser = await prisma.user.upsert({
    where: { email: data.email },
    update: {},
    create: {
      name: data.name,
      email: data.email,
      image: data.image,
    },
  })

  console.log('New user has been created: ', newUser.email)
  return newUser
}
