import { Message } from '.prisma/client'

export type MessageWithUser = Message & { user: { id: string, name: string | null, image: string | null } }
