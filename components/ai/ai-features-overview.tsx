'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  Clock,
  Zap,
  Target
} from 'lucide-react'

const aiFeatures = [
  {
    category: 'Smart Automation',
    features: [
      {
        name: 'Smart Invoice Generation',
        description: 'Auto-generate detailed invoice items from project descriptions',
        icon: FileText,
        status: 'active',
        impact: 'High'
      },
      {
        name: 'Task Intelligence',
        description: 'Break down projects into actionable tasks with priorities',
        icon: Target,
        status: 'active',
        impact: 'High'
      },
      {
        name: 'Email Assistant',
        description: 'Generate professional emails for any business situation',
        icon: MessageSquare,
        status: 'active',
        impact: 'Medium'
      }
    ]
  },
  {
    category: 'Analytics & Insights',
    features: [
      {
        name: 'Client Analytics',
        description: 'AI-powered analysis of client relationships and behavior',
        icon: TrendingUp,
        status: 'active',
        impact: 'High'
      },
      {
        name: 'Financial Forecasting',
        description: 'Predict revenue trends and cash flow patterns',
        icon: DollarSign,
        status: 'active',
        impact: 'High'
      },
      {
        name: 'Performance Insights',
        description: 'Track productivity and identify optimization opportunities',
        icon: BarChart3,
        status: 'coming-soon',
        impact: 'Medium'
      }
    ]
  },
  {
    category: 'Search & Discovery',
    features: [
      {
        name: 'Smart Search',
        description: 'Natural language search across all your CRM data',
        icon: Search,
        status: 'active',
        impact: 'Medium'
      },
      {
        name: 'Recommendation Engine',
        description: 'Get AI suggestions for pricing, timelines, and strategies',
        icon: Sparkles,
        status: 'coming-soon',
        impact: 'High'
      },
      {
        name: 'Document Intelligence',
        description: 'Extract insights from contracts, proposals, and documents',
        icon: Brain,
        status: 'coming-soon',
        impact: 'Medium'
      }
    ]
  }
]

export function AIFeaturesOverview() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered CRM Features</h2>
        <p className="text-gray-600">Leverage artificial intelligence to streamline your freelance business</p>
      </div>

      {aiFeatures.map((category) => (
        <div key={category.category}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.name} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{feature.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={feature.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                feature.impact === 'High' ? 'border-green-500 text-green-700' :
                                feature.impact === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                                'border-gray-500 text-gray-700'
                              }`}
                            >
                              {feature.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <Zap className="w-5 h-5 mr-2" />
            AI Benefits for Freelancers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-blue-900">Save Time</h4>
              <p className="text-sm text-blue-700">Automate repetitive tasks and focus on what matters</p>
            </div>
            <div className="text-center">
              <Calculator className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-purple-900">Increase Revenue</h4>
              <p className="text-sm text-purple-700">Better pricing insights and faster invoicing</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-900">Grow Smarter</h4>
              <p className="text-sm text-green-700">Data-driven decisions for business growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}