'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, TrendingUp } from 'lucide-react'

interface ClientInsightsProps {
  clientId: string
  clientName: string
}

export function ClientInsights({ clientId, clientName }: ClientInsightsProps) {
  const [insights, setInsights] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/client-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId })
      })
      const result = await response.json()
      setInsights(result.insights)
      setData(result.data)
    } catch (error) {
      setInsights('Error generating insights')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          AI Client Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateInsights} disabled={loading}>
          <TrendingUp className="w-4 h-4 mr-2" />
          {loading ? 'Analyzing...' : 'Generate Insights'}
        </Button>

        {data && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <div className="font-medium text-blue-900">Projects</div>
              <div className="text-2xl font-bold text-blue-600">{data.projectCount}</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="font-medium text-green-900">Revenue</div>
              <div className="text-2xl font-bold text-green-600">${data.totalRevenue}</div>
            </div>
          </div>
        )}

        {insights && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">AI Analysis:</h4>
            <p className="text-sm text-gray-700">{insights}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}