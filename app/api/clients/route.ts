import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const clients = await db.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        projects: true,
        _count: {
          select: { projects: true, invoices: true }
        }
      }
    })
    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating client:', body)
    
    // Ensure user exists
    await db.user.upsert({
      where: { id: 'temp-user-id' },
      update: {},
      create: {
        id: 'temp-user-id',
        email: 'demo@freelancecrm.com',
        name: 'Demo User'
      }
    })
    
    const client = await db.client.create({
      data: {
        ...body,
        userId: 'temp-user-id'
      }
    })
    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Client creation error:', error)
    return NextResponse.json({ error: 'Failed to create client: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 })
  }
}