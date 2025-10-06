'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Sparkles, TrendingUp, MessageSquare, Zap } from 'lucide-react'
import Link from 'next/link'

export function AIDashboardWidget() {
  const [aiStats] = useState({
    emailsGenerated: 24,
    invoicesCreated: 12,
    insightsProvided: 8,
    timesSaved: '4.2 hours'
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          AI Assistant Stats
        </CardTitle>
        <CardDescription>Your AI productivity this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{aiStats.emailsGenerated}</div>
            <div className="text-xs text-blue-700">Emails Generated</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{aiStats.invoicesCreated}</div>
            <div className="text-xs text-green-700">Smart Invoices</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{aiStats.insightsProvided}</div>
            <div className="text-xs text-purple-700">Client Insights</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{aiStats.timesSaved}</div>
            <div className="text-xs text-yellow-700">Hours Saved</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Quick AI Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Email
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Client Analysis
            </Button>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href="/dashboard/ai">
            <Zap className="w-4 h-4 mr-2" />
            Explore All AI Features
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}