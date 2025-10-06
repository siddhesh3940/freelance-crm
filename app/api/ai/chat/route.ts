import { NextRequest, NextResponse } from 'next/server'
import { generateGroqResponse } from '@/lib/groq'
import { generateOpenAIResponse } from '@/lib/openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json()
    console.log('Chat request:', { message, model })
    
    let response = ''

    switch (model) {
      case 'groq':
        console.log('Using Groq...')
        response = await generateGroqResponse(message)
        break

      case 'openai':
        console.log('Using OpenAI...')
        response = await generateOpenAIResponse(message)
        break

      case 'gemini':
        console.log('Using Gemini...')
        const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await geminiModel.generateContent(message)
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