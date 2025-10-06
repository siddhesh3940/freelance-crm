'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvoiceForm } from '@/components/invoices/invoice-form'
import { InvoiceList } from '@/components/invoices/invoice-list'
import { Plus } from 'lucide-react'

export default function InvoicesPage() {
  const [showForm, setShowForm] = useState(false)

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await fetch('/api/invoices')
      if (!response.ok) throw new Error('Failed to fetch invoices')
      return response.json()
    }
  })

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-600">Manage your billing and payments</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoiceForm onSuccess={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <InvoiceList invoices={invoices || []} isLoading={isLoading} />
    </div>
  )
}