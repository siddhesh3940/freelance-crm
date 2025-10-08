'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CurrencySelector } from '@/components/ui/currency-selector'
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  FileText, 
  CheckSquare,
  Settings,
  LogOut,
  Brain,
  MessageCircle
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/dashboard/clients', icon: Users },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'AI Assistant', href: '/dashboard/ai', icon: Brain },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/5 rounded-full translate-y-12 -translate-x-12" />
      
      {/* Header */}
      <div className="p-6 relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Freelance CRM</h2>
            <p className="text-slate-400 text-xs">AI-Powered Business</p>
          </div>
        </div>
        
        {/* Currency Selector */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
          <div className="text-slate-300 text-xs mb-2 font-medium">Currency</div>
          <CurrencySelector />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 relative z-10">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-4 py-3 text-sm font-medium rounded-xl mb-2 transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white backdrop-blur-sm'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Shimmer effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}
              
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 transition-all duration-300',
                  isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-white group-hover:scale-110'
                )}
              />
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <div className="ml-auto flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700/50 relative z-10">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
            DU
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Demo User</div>
            <div className="text-slate-400 text-xs">admin@demo.com</div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-slate-700/50 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
            <div className="text-blue-400 text-lg font-bold group-hover:scale-110 transition-transform">12</div>
            <div className="text-slate-400 text-xs">Active Projects</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
            <div className="text-green-400 text-lg font-bold group-hover:scale-110 transition-transform">$24K</div>
            <div className="text-slate-400 text-xs">This Month</div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="p-4 relative z-10">
        <button onClick={() => { localStorage.removeItem('isLoggedIn'); window.location.href = '/login'; }} className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 group border border-slate-700/50 hover:border-red-500/30">
          <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-red-400 transition-colors" />
          <span>Sign out</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          </div>
        </button>
      </div>
    </div>
  )
}