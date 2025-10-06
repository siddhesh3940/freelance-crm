import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const invoices = await db.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        project: true,
        items: true
      }
    })
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
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
    
    // Generate invoice number
    const count = await db.invoice.count()
    const invoiceNumber = `INV-${String(count + 1).padStart(3, '0')}`
    
    const invoice = await db.invoice.create({
      data: {
        ...body,
        number: invoiceNumber,
        userId: 'temp-user-id',
        items: {
          create: body.items
        }
      },
      include: {
        client: true,
        items: true
      }
    })
    
    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    console.error('Invoice creation error:', error)
    return NextResponse.json({ error: 'Failed to create invoice: ' + error.message }, { status: 500 })
  }
}