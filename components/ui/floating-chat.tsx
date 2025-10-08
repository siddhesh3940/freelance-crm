'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  role: 'user' | 'assistant'
  content: string
  invoice?: {
    clientName: string
    projectName: string
    items: Array<{
      description: string
      quantity: number
      rate: number
      amount: number
    }>
    subtotal: number
    total: number
  }
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 24, y: 24 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadPDF = (invoice: any) => {
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">INVOICE</h1>
        <div style="margin: 20px 0;">
          <p><strong>Client:</strong> ${invoice.clientName}</p>
          <p><strong>Project:</strong> ${invoice.projectName}</p>
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
            ${invoice.items.map((item: any) => `
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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      setPosition({
        x: window.innerWidth - e.clientX - dragOffset.x,
        y: window.innerHeight - e.clientY - dragOffset.y
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    setLoading(true)

    try {
      // Check if user is asking for invoice generation
      if (userInput.toLowerCase().includes('invoice') || userInput.toLowerCase().includes('bill')) {
        const response = await fetch('/api/ai/generate-invoice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectName: 'AI Generated Project',
            clientName: 'Client',
            workDescription: userInput
          })
        })
        const data = await response.json()
        
        if (data.items) {
          const subtotal = data.items.reduce((sum: number, item: any) => sum + item.amount, 0)
          const aiMessage: Message = {
            role: 'assistant',
            content: 'I\'ve generated a professional invoice based on your requirements:',
            invoice: {
              clientName: 'Client Name',
              projectName: 'AI Generated Project',
              items: data.items,
              subtotal,
              total: subtotal
            }
          }
          setMessages(prev => [...prev, aiMessage])
        }
      } else {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput, model: 'groq' })
        })
        const data = await response.json()
        
        const aiMessage: Message = {
          role: 'assistant',
          content: data.response
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    }
    setLoading(false)
  }

  return (
    <div 
      ref={dragRef}
      className="fixed z-50"
      style={{ 
        right: `${position.x}px`, 
        bottom: `${position.y}px`
      }}
    >
      <div className={`mb-4 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border flex flex-col transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'} ${position.x >= 384 ? 'origin-bottom-left' : 'origin-bottom-right'}`} style={{ transform: `${isOpen ? 'scale(1)' : 'scale(0.95)'} ${position.x >= 384 ? 'translateX(0)' : 'translateX(-320px)'}` }}>
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">AI Assistant</h3>
              <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`p-2 rounded-lg text-sm ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.content}
                    {message.invoice && (
                      <div className="mt-3 p-3 bg-white border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">Invoice Preview</h4>
                          <Button size="sm" onClick={() => downloadPDF(message.invoice!)} className="text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </Button>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          <div>Client: {message.invoice.clientName}</div>
                          <div>Project: {message.invoice.projectName}</div>
                        </div>
                        <div className="space-y-1">
                          {message.invoice.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                              <span>{item.description}</span>
                              <span>${item.amount}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-2 pt-2 flex justify-between text-sm font-semibold">
                          <span>Total:</span>
                          <span>${message.invoice.total}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-lg text-sm">AI is thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t" onMouseDown={(e) => e.stopPropagation()}>
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-sm"
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button size="sm" onClick={sendMessage} disabled={loading || !input.trim()} onMouseDown={(e) => e.stopPropagation()}>
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      
      <Button
        size="lg"
        onClick={(e) => {
          if (!isDragging) {
            setIsOpen(!isOpen)
          }
          e.stopPropagation()
        }}
        onMouseDown={(e) => {
          const rect = dragRef.current?.getBoundingClientRect()
          if (rect) {
            setDragOffset({
              x: rect.right - e.clientX,
              y: rect.bottom - e.clientY
            })
          }
          setIsDragging(true)
          e.preventDefault()
        }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group relative overflow-hidden"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="relative">
          {/* Robot Head */}
          <div className="w-8 h-8 bg-white/20 rounded-lg relative animate-pulse">
            {/* Eyes */}
            <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            {/* Mouth */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-white/60 rounded-full" />
            {/* Antenna */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-white/40" />
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping" />
          </div>
        </div>
        <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat to AI
        </span>
      </Button>
    </div>
  )
}