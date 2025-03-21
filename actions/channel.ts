'use server'

import { prisma } from '@/lib/prisma'
import { MessageWithUser } from '@/types'

export const getChannels = async (serverId: string) => {
  return prisma.channel.findMany({ where: { serverId } })
}

export const getMessages = async (channelId: string): Promise<MessageWithUser[]> => {
  return prisma.message.findMany({
    where: { channelId },
    include: {
      user: { select: { id: true, name: true, image: true } },
    }, orderBy: { createdAt: 'asc' },
  })
}

export const createMessage = async (formData: FormData) => {
  return prisma.message.create({
    data: {
      content: formData.get('content') as string,
      channelId: formData.get('channelId') as string,
      userId: formData.get('userId') as string,
    },
  })
}
