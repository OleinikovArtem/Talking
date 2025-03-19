import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

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
  return prisma.user.findFirst({ where: { clerkId: clerkId } })
}

export const getFriends = async (userId: string): Promise<User[]> => {
  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { senderId: userId, status: 'ACCEPTED' },
        { receiverId: userId, status: 'ACCEPTED' },
      ],
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  return friends.map(friend =>
    friend.senderId === userId ? friend.receiver : friend.sender,
  );
};
