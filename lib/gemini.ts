import { GoogleGenerativeAI } from '@google/generative-ai'
import { generateGroqResponse } from './groq'
import { generateOpenAIResponse } from './openai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateAIResponse(prompt: string): Promise<string> {
  console.log('=== AI Response Generation Started ===')
  console.log('Prompt:', prompt)
  console.log('Available APIs:', {
    groq: !!process.env.GROQ_API_KEY,
    openai: !!process.env.OPENAI_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY
  })
  
  // Try Groq first (free and fast)
  if (process.env.GROQ_API_KEY) {
    try {
      console.log('Attempting Groq API...')
      const result = await generateGroqResponse(prompt)
      console.log('Groq success:', result)
      return result
    } catch (error) {
      console.error('Groq failed:', error)
    }
  }
  
  // Try OpenAI (ChatGPT)
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log('Attempting OpenAI API...')
      const result = await generateOpenAIResponse(prompt)
      console.log('OpenAI success:', result)
      return result
    } catch (error) {
      console.error('OpenAI failed:', error)
    }
  }
  
  // Try Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log('Attempting Gemini API...')
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      console.log('Gemini success:', text)
      return text
    } catch (error) {
      console.error('Gemini failed:', error)
    }
  }
  
  // Fallback responses
  console.log('All AI services failed, using intelligent fallback')
  if (prompt.toLowerCase().includes('email')) {
    return generateEmailFallback(prompt)
  }
  if (prompt.toLowerCase().includes('invoice')) {
    return generateInvoiceFallback()
  }
  if (prompt.toLowerCase().includes('insight')) {
    return generateInsightFallback()
  }
  
  return 'Professional response: Thank you for your inquiry. I will get back to you shortly with the requested information.'
}

function generateEmailFallback(prompt: string): string {
  if (prompt.includes('follow-up')) {
    return `Subject: Following Up\n\nDear Client,\n\nI hope this email finds you well. I wanted to follow up on our recent discussion and see if you have any questions or need any additional information.\n\nPlease let me know if there's anything I can help you with.\n\nBest regards,\nYour Name`
  }
  if (prompt.includes('invoice')) {
    return `Subject: Invoice for Services\n\nDear Client,\n\nI hope you're doing well. Please find attached the invoice for the services provided. The payment is due within 30 days.\n\nIf you have any questions about the invoice, please don't hesitate to reach out.\n\nThank you for your business.\n\nBest regards,\nYour Name`
  }
  return `Subject: Professional Communication\n\nDear Client,\n\nI hope this email finds you well. I wanted to reach out regarding our recent discussion.\n\nPlease let me know if you have any questions.\n\nBest regards,\nYour Name`
}

function generateInvoiceFallback(): string {
  return JSON.stringify([
    { description: "Professional Services", quantity: 1, rate: 100 },
    { description: "Consultation", quantity: 2, rate: 75 }
  ])
}

function generateInsightFallback(): string {
  return "This client shows consistent project engagement with good payment history. Consider offering additional services or discussing long-term partnership opportunities."
}