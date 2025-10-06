import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { projectDescription } = await request.json()

    const prompt = `Break down this project into specific, actionable tasks with priorities and estimated hours:

Project: "${projectDescription}"

Format the response as a structured list with:
- Task name
- Priority (High/Medium/Low)
- Estimated hours
- Dependencies (if any)

Provide 5-8 realistic tasks that cover the full project lifecycle from planning to delivery.`

    const tasks = await generateAIResponse(prompt)

    return NextResponse.json({ tasks })
  } catch (error) {
    return NextResponse.json({ tasks: 'Error generating tasks' }, { status: 200 })
  }
}