import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateAIResponse } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    const clients = await db.client.findMany({
      include: {
        projects: true,
        invoices: true,
        communications: true
      }
    })

    const projects = await db.project.findMany({
      include: { client: true }
    })

    const invoices = await db.invoice.findMany({
      include: { client: true }
    })

    const searchData = {
      totalClients: clients.length,
      totalProjects: projects.length,
      totalInvoices: invoices.length,
      unpaidInvoices: invoices.filter(inv => inv.status === 'SENT' || inv.status === 'OVERDUE').length,
      activeProjects: projects.filter(proj => proj.status === 'ACTIVE').length,
      completedProjects: projects.filter(proj => proj.status === 'COMPLETED').length
    }

    const prompt = `User query: "${query}"

Available data:
- ${searchData.totalClients} clients
- ${searchData.totalProjects} projects (${searchData.activeProjects} active, ${searchData.completedProjects} completed)
- ${searchData.totalInvoices} invoices (${searchData.unpaidInvoices} unpaid)

Based on this query and data, provide a helpful response with specific insights or recommendations. If the query asks for specific data that would require database filtering, explain what information would be available.`

    const results = await generateAIResponse(prompt)

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json({ results: 'Error performing search' }, { status: 200 })
  }
}