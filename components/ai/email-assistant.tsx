'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Copy } from 'lucide-react'

interface EmailAssistantProps {
  clientName?: string
}

export function EmailAssistant({ clientName = 'Client' }: EmailAssistantProps) {
  const [emailType, setEmailType] = useState('followup')
  const [context, setContext] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const generateEmail = async () => {
    if (!context.trim()) {
      setGeneratedEmail('Please provide some context first.')
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('/api/ai/email-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: emailType, clientName, context })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setGeneratedEmail(data.content || 'No content generated')
    } catch (error) {
      console.error('Email generation error:', error)
      setGeneratedEmail('Error generating email: ' + error.message)
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="w-5 h-5 mr-2" />
          AI Email Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <select
          value={emailType}
          onChange={(e) => setEmailType(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="followup">Follow-up Email</option>
          <option value="invoice">Invoice Email</option>
          <option value="project">Project Update</option>
          <option value="meeting">Meeting Request</option>
        </select>

        <textarea
          placeholder="Describe the context or details..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full border rounded-md px-3 py-2 h-20"
        />

        <Button onClick={generateEmail} disabled={loading || !context}>
          <Sparkles className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Email'}
        </Button>

        {generatedEmail && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Generated Email:</h4>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-sm whitespace-pre-wrap">
              {generatedEmail}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}