'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const createServer = async (formData: FormData) => {
  const userId = formData.get('userId') as string;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const server = await prisma.server.create({
    data: {
      name: formData.get('name') as string,
      image: (formData.get('image') as string) || '',
      ownerId: user.id,
    },
  });

  console.log('New server has been created:', server.name);

  redirect('/channels/' + server.id)
};
