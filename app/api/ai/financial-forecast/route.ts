import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateAIResponse } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { timeframe } = await request.json()

    const invoices = await db.invoice.findMany({
      where: { status: 'PAID' },
      orderBy: { createdAt: 'desc' },
      take: 12
    })

    const projects = await db.project.findMany({
      where: { status: 'ACTIVE' },
      include: { client: true }
    })

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0)
    const avgMonthlyRevenue = totalRevenue / Math.max(invoices.length, 1)
    const activeProjects = projects.length

    const prompt = `Based on this financial data, provide a ${timeframe} forecast:
- Total revenue: $${totalRevenue}
- Average monthly revenue: $${avgMonthlyRevenue}
- Active projects: ${activeProjects}
- Recent invoices: ${invoices.length}

Provide realistic revenue predictions, cash flow insights, and business recommendations in 3-4 sentences.`

    const forecast = await generateAIResponse(prompt)

    return NextResponse.json({ forecast })
  } catch (error) {
    return NextResponse.json({ forecast: 'Error generating forecast' }, { status: 200 })
  }
}