import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  // Return demo data for now to prevent errors
  return NextResponse.json({
    totalRevenue: 24500,
    activeProjects: 12,
    pendingInvoices: 3,
    activeClients: 8
  })
  
  // Commented out database code until DB is properly set up
  /*
  try {
    const [clients, projects, invoices] = await Promise.all([
      db.client.findMany().catch(() => []),
      db.project.findMany().catch(() => []),
      db.invoice.findMany().catch(() => [])
    ])

    const totalRevenue = invoices
      .filter(invoice => invoice.status === 'PAID')
      .reduce((sum, invoice) => sum + (invoice.total || 0), 0)

    const activeProjects = projects.filter(project => project.status === 'ACTIVE').length
    const pendingInvoices = invoices.filter(invoice => invoice.status === 'SENT' || invoice.status === 'OVERDUE').length
    const activeClients = clients.length

    return NextResponse.json({
      totalRevenue: totalRevenue || 0,
      activeProjects: activeProjects || 0,
      pendingInvoices: pendingInvoices || 0,
      activeClients: activeClients || 0
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({
      totalRevenue: 0,
      activeProjects: 0,
      pendingInvoices: 0,
      activeClients: 0
    })
  }
  */
}