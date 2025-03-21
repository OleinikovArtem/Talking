import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { search, userId } = Object.fromEntries(req.nextUrl.searchParams)

  if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 })

  try {
    const servers = await prisma.server.findMany({
      where: { name: { contains: search.toLowerCase() || '', mode: 'insensitive', } },
      select: {
        id: true,
        name: true,
        image: true,
        _count: { select: { memberships: true } },
      },
    })

    return NextResponse.json(servers)
  } catch (error) {
    console.error('Failed to fetch servers:', error)
    return NextResponse.json({ error: 'Failed to fetch servers' }, { status: 500 })
  }
}
