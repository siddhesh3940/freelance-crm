'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Download, Send, Eye } from 'lucide-react'
import Link from 'next/link'

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/invoices/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch invoice')
      return response.json()
    }
  })

  const downloadInvoice = async () => {
    try {
      const response = await fetch(`/api/invoices/${params.id}/download`)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Invoice-${invoice.number}.pdf`
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
    return <div className="text-center py-8">Loading invoice...</div>
  }

  if (!invoice) {
    return <div className="text-center py-8">Invoice not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoice {invoice.number}</h1>
          <p className="text-gray-600">View and manage invoice details</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadInvoice}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Link href="/dashboard/invoices">
            <Button variant="outline">Back to Invoices</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <div className="text-sm space-y-1">
                <div className="font-medium">{invoice.client.name}</div>
                {invoice.client.company && <div>{invoice.client.company}</div>}
                {invoice.client.address && <div>{invoice.client.address}</div>}
                {invoice.client.email && <div>{invoice.client.email}</div>}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Invoice Info:</h3>
              <div className="text-sm space-y-1">
                <div>Issue Date: {formatDate(invoice.issueDate)}</div>
                <div>Due Date: {formatDate(invoice.dueDate)}</div>
                <div>Status: <span className={`px-2 py-1 rounded text-xs ${
                  invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                  invoice.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                  invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>{invoice.status}</span></div>
                {invoice.project && <div>Project: {invoice.project.name}</div>}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Items:</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item: any) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(item.rate)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
              {invoice.tax > 0 && (
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(invoice.tax)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes:</h3>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}