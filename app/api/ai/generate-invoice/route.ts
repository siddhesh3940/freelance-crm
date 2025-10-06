import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { projectData, projectName, clientName, workDescription } = await request.json()
    const description = projectData || workDescription
    
    console.log('Invoice generation request:', { projectName, clientName, workDescription })

    const prompt = `Generate 2-3 professional invoice line items for:
Project: ${projectName || 'Professional Services'}
Client: ${clientName || 'Client'}
Work: ${description || 'Consulting services'}

Return ONLY a valid JSON array in this exact format:
[{"description": "Service description", "quantity": 1, "rate": 100}]`

    const content = await generateAIResponse(prompt)
    console.log('AI response:', content)
    
    let items
    try {
      // Try to parse AI response
      items = JSON.parse(content)
    } catch (parseError) {
      console.log('JSON parse failed, using fallback')
      // Fallback items if AI response isn't valid JSON
      items = [
        { description: `${projectName || 'Professional Services'} - Consultation`, quantity: 1, rate: 100 },
        { description: `${projectName || 'Professional Services'} - Implementation`, quantity: 1, rate: 150 }
      ]
    }
    
    // Ensure items have required fields
    const validItems = items.map((item: any) => ({
      description: item.description || 'Professional Services',
      quantity: Number(item.quantity) || 1,
      rate: Number(item.rate) || 100,
      amount: (Number(item.quantity) || 1) * (Number(item.rate) || 100)
    }))

    return NextResponse.json({ items: validItems })
  } catch (error) {
    console.error('Invoice generation error:', error)
    // Return fallback items
    const fallbackItems = [
      { description: 'Professional Consultation', quantity: 1, rate: 100, amount: 100 },
      { description: 'Project Implementation', quantity: 1, rate: 150, amount: 150 }
    ]
    return NextResponse.json({ items: fallbackItems })
  }
}