import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: { project: { include: { client: true } } }
    })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
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
    
    const task = await db.task.create({
      data: {
        ...body,
        projectId: body.projectId || null,
        estimatedHours: body.estimatedHours ? parseFloat(body.estimatedHours) : null,
        userId: 'temp-user-id'
      },
      include: { project: { include: { client: true } } }
    })
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Task creation error:', error)
    return NextResponse.json({ error: 'Failed to create task: ' + error.message }, { status: 500 })
  }
}