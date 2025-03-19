import { prisma } from '@/lib/prisma'

export const getChannels = async (serverId: string) => {
  return prisma.channel.findMany({ where: { serverId } })
}
