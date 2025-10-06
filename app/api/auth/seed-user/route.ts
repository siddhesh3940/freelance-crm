import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash('password', 12)

    const user = await db.user.upsert({
      where: { email: 'admin@demo.com' },
      update: {},
      create: {
        email: 'admin@demo.com',
        password: hashedPassword,
        name: 'John Doe'
      }
    })

    return NextResponse.json({ message: 'Demo user created', user: { id: user.id, email: user.email, name: user.name } })
  } catch (error) {
    console.error('Seed user error:', error)
    return NextResponse.json({ error: 'Failed to create demo user' }, { status: 500 })
  }
}