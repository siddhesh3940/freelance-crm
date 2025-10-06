'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Eye, Send, Download } from 'lucide-react'
import Link from 'next/link'

interface Invoice {
  id: string
  number: string
  status: string
  issueDate: string
  dueDate: string
  total: number
  client: {
    name: string
    company?: string
  }
  project?: {
    name: string
  }
}

interface InvoiceListProps {
  invoices: Invoice[]
  isLoading: boolean
}

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SENT: 'bg-blue-100 text-blue-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-100 text-gray-800'
}

export function InvoiceList({ invoices, isLoading }: InvoiceListProps) {
  const downloadInvoice = async (invoiceId: string, invoiceNumber: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/download`)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Invoice-${invoiceNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download invoice')
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading invoices...</div>
  }

  if (!invoices.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No invoices found. Create your first invoice to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <Card key={invoice.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{invoice.number}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status as keyof typeof statusColors]}`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>{invoice.client.name} {invoice.client.company && `(${invoice.client.company})`}</div>
                  {invoice.project && <div>Project: {invoice.project.name}</div>}
                </div>
                <div className="text-sm text-gray-500">
                  Issued: {formatDate(invoice.issueDate)} • Due: {formatDate(invoice.dueDate)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold">{formatCurrency(invoice.total)}</div>
                <div className="flex gap-2 mt-2">
                  <Link href={`/dashboard/invoices/${invoice.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline">
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => downloadInvoice(invoice.id, invoice.number)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}