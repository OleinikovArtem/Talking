import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest) {
  try {
    const { serverId, userId } = await req.json()

    if (!serverId || !userId) {
      return NextResponse.json({ error: 'Server ID and User ID are required' }, { status: 400 })
    }

    const existingMembership = await prisma.membership.findFirst({
      where: { serverId, userId },
    })

    if (existingMembership) {
      return NextResponse.json({ error: 'You are already a member of this server' }, { status: 400 })
    }

    const newMembership = await prisma.membership.create({
      data: { serverId, userId },
    })

    return NextResponse.json({ success: true, membership: newMembership })
  } catch (error) {
    console.error('Failed to join server:', error)
    return NextResponse.json({ error: 'Failed to join server' }, { status: 500 })
  }
}
