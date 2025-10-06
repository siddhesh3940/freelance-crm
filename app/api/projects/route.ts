import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        tasks: true,
        _count: { select: { tasks: true } }
      }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
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
    
    const project = await db.project.create({
      data: {
        ...body,
        budget: body.budget ? parseFloat(body.budget) : null,
        hourlyRate: body.hourlyRate ? parseFloat(body.hourlyRate) : null,
        userId: 'temp-user-id'
      },
      include: { client: true }
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Failed to create project: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 })
  }
}