import { NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/gemini'

export async function GET() {
  try {
    const response = await generateAIResponse('Say hello in a professional way')
    return NextResponse.json({
      status: 'success',
      message: 'AI is working!',
      response: response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI test error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'AI connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}