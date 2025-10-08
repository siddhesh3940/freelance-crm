'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { CurrencyProvider } from '@/contexts/currency-context'
import { FloatingChat } from '@/components/ui/floating-chat'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      router.push('/login')
    } else {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <CurrencyProvider>
      <div className="flex h-screen crm-bg grid-pattern relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-40" />
      <div className="absolute inset-0 data-flow opacity-20" />
      
      <div className="absolute top-20 left-20 w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
        <svg className="w-8 h-8 text-blue-500/50" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      </div>
      
      <div className="absolute top-40 right-32 w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center animate-float backdrop-blur-sm" style={{ animationDelay: '1s' }}>
        <svg className="w-10 h-10 text-green-500/50" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
      </div>
      
      <div className="absolute bottom-32 left-40 w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center animate-float backdrop-blur-sm" style={{ animationDelay: '2s' }}>
        <svg className="w-7 h-7 text-purple-500/50" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-20 w-18 h-18 bg-orange-500/10 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm" style={{ animationDelay: '0.5s' }}>
        <svg className="w-9 h-9 text-orange-500/50" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      </div>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M100,200 Q300,100 500,300 T900,200" stroke="url(#line-gradient)" strokeWidth="2" fill="none" className="animate-pulse" />
        <path d="M200,400 Q400,300 600,500 T1000,400" stroke="url(#line-gradient)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
      </svg>
      
      <div className="relative z-30">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto relative z-20">
        <div className="p-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
      <FloatingChat />
      </div>
    </CurrencyProvider>
  )
}