'use client'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Network nodes */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-green-400/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Animated connection paths */}
        <path 
          d="M25% 25% Q50% 10% 66% 33%" 
          stroke="url(#connection-gradient)" 
          strokeWidth="1" 
          fill="none" 
          className="animate-pulse"
          strokeDasharray="5,5"
        />
        <path 
          d="M33% 66% Q60% 50% 75% 25%" 
          stroke="url(#connection-gradient)" 
          strokeWidth="1" 
          fill="none" 
          className="animate-pulse"
          strokeDasharray="3,7"
          style={{ animationDelay: '1.5s' }}
        />
        <path 
          d="M25% 75% Q40% 60% 66% 75%" 
          stroke="url(#connection-gradient)" 
          strokeWidth="1" 
          fill="none" 
          className="animate-pulse"
          strokeDasharray="4,6"
          style={{ animationDelay: '0.8s' }}
        />
      </svg>
      
      {/* Business metrics visualization */}
      <div className="absolute top-10 right-10 opacity-20">
        <svg width="120" height="80" viewBox="0 0 120 80" className="text-blue-500">
          <path d="M10,70 Q30,20 50,40 T90,30 L110,10" stroke="currentColor" strokeWidth="2" fill="none" className="animate-pulse" />
          <circle cx="10" cy="70" r="2" fill="currentColor" className="animate-pulse" />
          <circle cx="50" cy="40" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="90" cy="30" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="110" cy="10" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        </svg>
      </div>
    </div>
  )
}