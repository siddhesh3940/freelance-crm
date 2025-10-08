'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  DollarSign, 
  MessageSquare,
  Search,
  Calculator,
  BarChart3,
  Lightbulb,
  Info
} from 'lucide-react'
import { AIFeaturesOverview } from '@/components/ai/ai-features-overview'

export default function AIPage() {
  const [activeFeature, setActiveFeature] = useState('smart-invoice')
  const [showOverview, setShowOverview] = useState(false)

  const aiFeatures = [
    {
      id: 'smart-invoice',
      title: 'Smart Invoice Generation',
      description: 'Auto-generate invoice descriptions and pricing',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'client-insights',
      title: 'Client Analytics',
      description: 'AI-powered client behavior analysis',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'email-assistant',
      title: 'Email Assistant',
      description: 'Generate professional emails instantly',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'financial-forecast',
      title: 'Financial Forecasting',
      description: 'Predict revenue and cash flow',
      icon: DollarSign,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      id: 'smart-search',
      title: 'Smart Search',
      description: 'Natural language search across all data',
      icon: Search,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'task-automation',
      title: 'Task Intelligence',
      description: 'Auto-create and prioritize tasks',
      icon: Brain,
      color: 'bg-red-50 text-red-600'
    }
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-gray-600">Supercharge your freelance business with AI-powered tools</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowOverview(!showOverview)}
        >
          <Info className="w-4 h-4 mr-2" />
          {showOverview ? 'Hide Overview' : 'Show Overview'}
        </Button>
      </div>

      {showOverview && (
        <div className="mb-8">
          <AIFeaturesOverview />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Card 
              key={feature.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeFeature === feature.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeFeature === 'smart-invoice' && <SmartInvoiceGenerator />}
          {activeFeature === 'client-insights' && <ClientInsightsPanel />}
          {activeFeature === 'email-assistant' && <EmailAssistantPanel />}
          {activeFeature === 'financial-forecast' && <FinancialForecast />}
          {activeFeature === 'smart-search' && <SmartSearchPanel />}
          {activeFeature === 'task-automation' && <TaskIntelligence />}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              AI Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Pro Tip</h4>
              <p className="text-sm text-blue-700">Use specific context in your prompts for better AI results</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Best Practice</h4>
              <p className="text-sm text-green-700">Review AI-generated content before sending to clients</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">Feature Request</h4>
              <p className="text-sm text-purple-700">Need a custom AI feature? Let us know!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SmartInvoiceGenerator() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI invoice assistant powered by Groq. Describe your project work and I\'ll generate professional invoice items for you.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState(null)

  const downloadPDF = (invoice) => {
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">INVOICE</h1>
        <div style="margin: 20px 0;">
          <p><strong>Client:</strong> ${invoice.clientName || 'Client Name'}</p>
          <p><strong>Project:</strong> ${invoice.projectName || 'AI Generated Project'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Description</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Qty</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Rate</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 12px;">${item.description}</td>
                <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">$${item.rate}</td>
                <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">$${item.amount}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="text-align: right; margin-top: 20px;">
          <p style="font-size: 18px; font-weight: bold;">Total: $${invoice.total}</p>
        </div>
      </div>
    `
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Invoice</title></head>
          <body>${content}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai/generate-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData: input })
      })
      const result = await response.json()
      
      if (result.items) {
        const subtotal = result.items.reduce((sum, item) => sum + item.amount, 0)
        const invoice = {
          clientName: 'Client Name',
          projectName: 'AI Generated Project',
          items: result.items,
          subtotal,
          total: subtotal
        }
        setCurrentInvoice(invoice)
        
        const aiMessage = {
          role: 'assistant',
          content: 'I\'ve generated a professional invoice based on your requirements. You can preview it below and download as PDF.',
          invoice
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error generating your invoice. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-600" />
          AI Invoice Chat (Powered by Groq)
        </CardTitle>
        <CardDescription>Chat with AI to generate professional invoice items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm whitespace-pre-wrap font-sans">{message.content}</div>
                {message.invoice && (
                  <div className="mt-3 p-3 bg-white border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">Invoice Preview</h4>
                      <Button size="sm" onClick={() => downloadPDF(message.invoice)} className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <div>Client: {message.invoice.clientName}</div>
                      <div>Project: {message.invoice.projectName}</div>
                      <div>Date: {new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="space-y-1">
                      {message.invoice.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs border-b pb-1">
                          <div>
                            <div className="font-medium">{item.description}</div>
                            <div className="text-gray-500">{item.quantity} × ${item.rate}</div>
                          </div>
                          <span className="font-medium">${item.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-2 pt-2 flex justify-between text-sm font-bold">
                      <span>Total:</span>
                      <span>${message.invoice.total}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Describe your project work... (e.g., 'Built a React dashboard with authentication')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          💡 Powered by Groq AI - Fast, free, and intelligent
        </div>
      </CardContent>
    </Card>
  )
}

function ClientInsightsPanel() {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [insights, setInsights] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingClients, setLoadingClients] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients')
      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    } finally {
      setLoadingClients(false)
    }
  }

  const generateInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/client-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: selectedClient })
      })
      const result = await response.json()
      setInsights(result.insights)
    } catch (error) {
      setInsights('Error generating insights')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Analytics & Insights</CardTitle>
        <CardDescription>Get AI-powered analysis of client relationships</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger>
            <SelectValue placeholder={loadingClients ? "Loading clients..." : "Select a client"} />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client: any) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={generateInsights} disabled={loading || !selectedClient}>
          <BarChart3 className="w-4 h-4 mr-2" />
          {loading ? 'Analyzing...' : 'Generate Insights'}
        </Button>
        {insights && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">AI Analysis:</h4>
            <p className="text-sm">{insights}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EmailAssistantPanel() {
  const [emailType, setEmailType] = useState('followup')
  const [context, setContext] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const generateEmail = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/email-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: emailType, clientName: 'Client', context })
      })
      const result = await response.json()
      setGeneratedEmail(result.content)
    } catch (error) {
      setGeneratedEmail('Error generating email')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Assistant</CardTitle>
        <CardDescription>Generate professional emails for any situation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={emailType} onValueChange={setEmailType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="followup">Follow-up Email</SelectItem>
            <SelectItem value="invoice">Invoice Email</SelectItem>
            <SelectItem value="project">Project Update</SelectItem>
            <SelectItem value="meeting">Meeting Request</SelectItem>
            <SelectItem value="proposal">Project Proposal</SelectItem>
            <SelectItem value="thank-you">Thank You Email</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Provide context for the email..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={3}
        />
        <Button onClick={generateEmail} disabled={loading || !context}>
          <MessageSquare className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Email'}
        </Button>
        {generatedEmail && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Generated Email:</h4>
            <div className="text-sm whitespace-pre-wrap">{generatedEmail}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FinancialForecast() {
  const [timeframe, setTimeframe] = useState('3months')
  const [forecast, setForecast] = useState('')
  const [loading, setLoading] = useState(false)

  const generateForecast = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/financial-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeframe })
      })
      const result = await response.json()
      setForecast(result.forecast)
    } catch (error) {
      setForecast('Error generating forecast')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Forecasting</CardTitle>
        <CardDescription>AI-powered revenue and cash flow predictions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Next Month</SelectItem>
            <SelectItem value="3months">Next 3 Months</SelectItem>
            <SelectItem value="6months">Next 6 Months</SelectItem>
            <SelectItem value="1year">Next Year</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={generateForecast} disabled={loading}>
          <Calculator className="w-4 h-4 mr-2" />
          {loading ? 'Analyzing...' : 'Generate Forecast'}
        </Button>
        {forecast && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Financial Forecast:</h4>
            <p className="text-sm">{forecast}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SmartSearchPanel() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)

  const performSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const result = await response.json()
      setResults(result.results)
    } catch (error) {
      setResults('Error performing search')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Search</CardTitle>
        <CardDescription>Search your CRM data using natural language</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Ask anything... (e.g., 'Show me clients who haven't paid invoices')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && performSearch()}
        />
        <Button onClick={performSearch} disabled={loading || !query}>
          <Search className="w-4 h-4 mr-2" />
          {loading ? 'Searching...' : 'Search'}
        </Button>
        {results && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Search Results:</h4>
            <p className="text-sm">{results}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TaskIntelligence() {
  const [projectDescription, setProjectDescription] = useState('')
  const [generatedTasks, setGeneratedTasks] = useState('')
  const [loading, setLoading] = useState(false)

  const generateTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/task-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectDescription })
      })
      const result = await response.json()
      setGeneratedTasks(result.tasks)
    } catch (error) {
      setGeneratedTasks('Error generating tasks')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Intelligence</CardTitle>
        <CardDescription>Auto-generate tasks and priorities from project descriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe your project... (e.g., 'Build an e-commerce website with payment integration')"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          rows={4}
        />
        <Button onClick={generateTasks} disabled={loading || !projectDescription}>
          <Brain className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Tasks'}
        </Button>
        {generatedTasks && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Generated Tasks:</h4>
            <div className="text-sm whitespace-pre-wrap">{generatedTasks}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}