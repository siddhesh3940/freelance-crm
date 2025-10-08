import { NextRequest, NextResponse } from 'next/server'
import { generateGroqResponse } from '@/lib/groq'
import { generateOpenAIResponse } from '@/lib/openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json()
    console.log('Chat request:', { message, model })
    
    // Add CRM context restriction
    const restrictedMessage = `You are a professional CRM assistant for freelancers and small businesses. Only respond to queries related to:
- Client relationship management
- Project management
- Invoice and billing
- Business communications
- Task management
- Financial tracking
- Professional services
- Business strategy and growth
- Time tracking and productivity

If the query is not business/CRM related, politely decline and redirect to business topics.

User query: ${message}`
    
    let response = ''

    switch (model) {
      case 'groq':
        console.log('Using Groq...')
        response = await generateGroqResponse(restrictedMessage)
        break

      case 'openai':
        console.log('Using OpenAI...')
        response = await generateOpenAIResponse(restrictedMessage)
        break

      case 'gemini':
        console.log('Using Gemini...')
        const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await geminiModel.generateContent(restrictedMessage)
        const geminiResponse = await result.response
        response = geminiResponse.text()
        break

      default:
        response = 'Please select a valid AI model.'
    }

    console.log('AI Response:', response)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    const { model } = await request.json().catch(() => ({ model: 'unknown' }))
    return NextResponse.json({ 
      response: `Error with ${model} API: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: true 
    })
  }
}