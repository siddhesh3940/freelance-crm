'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardStats } from '@/components/dashboard/stats'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { EmailAssistant } from '@/components/ai/email-assistant'
import { Database, Brain, FileText, TrendingUp, DollarSign, Sparkles, Users, FolderOpen, CheckSquare } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [seeding, setSeeding] = useState(false)

  const createSampleData = async () => {
    setSeeding(true)
    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      const result = await response.json()
      if (response.ok) {
        alert('Sample data created! Refresh the page to see it.')
        window.location.reload()
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Failed to create sample data')
    }
    setSeeding(false)
  }

  const createDemoUser = async () => {
    try {
      const response = await fetch('/api/auth/seed-user', { method: 'POST' })
      const result = await response.json()
      if (response.ok) {
        alert('Demo user created! Email: admin@demo.com, Password: password')
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Failed to create demo user')
    }
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={createSampleData} disabled={seeding} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200">
            <Database className="w-4 h-4 mr-2" />
            {seeding ? 'Creating...' : 'Add Sample Data'}
          </Button>
          <Button onClick={createDemoUser} variant="outline" className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-green-200 hover:border-green-400 text-green-700 hover:text-green-800 shadow-lg transform hover:scale-105 transition-all duration-200">
            Create Demo User
          </Button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your projects and clients</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 group">
                <Users className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-slate-800">New Client</div>
                <div className="text-sm text-slate-600">Add a new client</div>
              </button>
              <button className="p-4 text-left border-2 border-dashed border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 transform hover:scale-105 group">
                <FileText className="w-6 h-6 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-slate-800">Create Invoice</div>
                <div className="text-sm text-slate-600">Generate new invoice</div>
              </button>
              <button className="p-4 text-left border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 group">
                <FolderOpen className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-slate-800">New Project</div>
                <div className="text-sm text-slate-600">Start a new project</div>
              </button>
              <button className="p-4 text-left border-2 border-dashed border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 group">
                <CheckSquare className="w-6 h-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-slate-800">Add Task</div>
                <div className="text-sm text-slate-600">Create a new task</div>
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="transform hover:scale-105 transition-all duration-300">
          <EmailAssistant />
        </div>
      </div>

      <Card className="mt-8 shadow-2xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16" />
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            AI-Powered Features
          </CardTitle>
          <CardDescription className="text-lg">Supercharge your freelance business with AI assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white/90 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-lg">Smart Invoicing</div>
              </div>
              <div className="text-slate-600">Auto-generate invoice items from project descriptions</div>
            </div>
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white/90 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-lg">Client Insights</div>
              </div>
              <div className="text-slate-600">AI-powered analysis of client relationships</div>
            </div>
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white/90 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-lg">Financial Forecasting</div>
              </div>
              <div className="text-slate-600">Predict revenue and cash flow trends</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200" asChild>
              <Link href="/dashboard/ai">
                <Sparkles className="w-5 h-5 mr-2" />
                Explore All AI Features
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}