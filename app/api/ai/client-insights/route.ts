import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateAIResponse } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { clientId } = await request.json()

    const client = await db.client.findUnique({
      where: { id: clientId },
      include: {
        projects: true,
        invoices: true,
        communications: true
      }
    })

    if (!client) {
      return NextResponse.json({ insights: 'Client not found' }, { status: 404 })
    }

    const data = {
      projectCount: client.projects.length,
      totalRevenue: client.invoices.reduce((sum, inv) => sum + inv.total, 0),
      avgProjectValue: client.invoices.length > 0 ? 
        client.invoices.reduce((sum, inv) => sum + inv.total, 0) / client.invoices.length : 0,
      communicationCount: client.communications.length
    }

    const prompt = `Analyze this client data and provide 3 key insights:
- ${data.projectCount} projects completed
- $${data.totalRevenue} total revenue
- $${data.avgProjectValue} average project value
- ${data.communicationCount} communications

Provide actionable business insights in 2-3 sentences.`

    const insights = await generateAIResponse(prompt)

    return NextResponse.json({ insights, data })
  } catch (error) {
    return NextResponse.json({ insights: 'Error generating insights' }, { status: 200 })
  }
}