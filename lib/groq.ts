export async function generateGroqResponse(prompt: string): Promise<string> {
  try {
    console.log('Groq API Key exists:', !!process.env.GROQ_API_KEY)
    console.log('Making Groq API request with prompt:', prompt)
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    console.log('Groq response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error response:', errorText)
      throw new Error(`Groq API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Groq response data:', data)
    
    const content = data.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content in Groq response')
    }
    
    return content
  } catch (error) {
    console.error('Groq API error:', error)
    throw error
  }
}