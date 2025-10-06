import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test basic connection
    const result = await db.$queryRaw`SELECT 1 as test`
    
    // Test table access
    const userCount = await db.user.count()
    const clientCount = await db.client.count()
    const projectCount = await db.project.count()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connected successfully!',
      connection: result,
      counts: {
        users: userCount,
        clients: clientCount,
        projects: projectCount
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}