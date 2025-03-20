import { prisma } from '@/lib/prisma'

export const getChannels = async (serverId: string) => {
  return prisma.channel.findMany({ where: { serverId } })
}

export const getMessages = async (channelId: string) => {
  return prisma.message.findMany({ where: { channelId }, include: { user: true }, orderBy: { createdAt: 'asc' } })
}
