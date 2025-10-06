import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [clients, projects, invoices] = await Promise.all([
      db.client.findMany(),
      db.project.findMany(),
      db.invoice.findMany()
    ])

    const totalRevenue = invoices
      .filter(invoice => invoice.status === 'PAID')
      .reduce((sum, invoice) => sum + invoice.total, 0)

    const activeProjects = projects.filter(project => project.status === 'ACTIVE').length
    const pendingInvoices = invoices.filter(invoice => invoice.status === 'SENT' || invoice.status === 'OVERDUE').length
    const activeClients = clients.length

    return NextResponse.json({
      totalRevenue,
      activeProjects,
      pendingInvoices,
      activeClients
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}