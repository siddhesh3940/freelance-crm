import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { type, clientName, context } = await request.json()
    
    console.log('Email template request:', { type, clientName, context })

    if (!context || !context.trim()) {
      return NextResponse.json({ content: 'Please provide context for the email.' })
    }

    const prompts = {
      followup: `Write a professional follow-up email to ${clientName} about: ${context}. Keep it concise and professional.`,
      invoice: `Write a professional email to ${clientName} sending an invoice for: ${context}. Include a polite request for payment.`,
      project: `Write a professional project update email to ${clientName} about: ${context}. Include next steps.`,
      meeting: `Write a professional meeting request email to ${clientName} about: ${context}. Suggest a few time options.`
    }

    const prompt = prompts[type as keyof typeof prompts] || prompts.followup
    console.log('Using prompt:', prompt)
    
    const emailContent = await generateAIResponse(prompt)
    console.log('Generated content:', emailContent)

    return NextResponse.json({ content: emailContent })
  } catch (error) {
    console.error('Email template generation error:', error)
    return NextResponse.json({ 
      content: 'Error generating email template: ' + error.message 
    }, { status: 500 })
  }
}