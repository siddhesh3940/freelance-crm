import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function generateOpenAIResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 500
    })

    return completion.choices[0]?.message?.content || 'No response generated'
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}