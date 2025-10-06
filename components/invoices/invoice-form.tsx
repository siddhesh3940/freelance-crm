'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

interface InvoiceFormProps {
  onSuccess: () => void
}

export function InvoiceForm({ onSuccess }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    dueDate: '',
    notes: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
  })
  const [aiLoading, setAiLoading] = useState(false)

  const queryClient = useQueryClient()

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await fetch('/api/clients')
      return response.json()
    }
  })

  const createInvoice = useMutation({
    mutationFn: async (data: any) => {
      const subtotal = data.items.reduce((sum: number, item: any) => sum + item.amount, 0)
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          subtotal,
          total: subtotal,
          tax: 0
        })
      })
      if (!response.ok) throw new Error('Failed to create invoice')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      onSuccess()
    }
  })

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate
    }
    setFormData({ ...formData, items: newItems })
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    })
  }

  const generateAIItems = async () => {
    if (!formData.clientId) {
      alert('Please select a client first')
      return
    }
    
    setAiLoading(true)
    try {
      const client = clients?.find((c: any) => c.id === formData.clientId)
      console.log('Generating AI items for client:', client?.name)
      
      const response = await fetch('/api/ai/generate-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: 'Professional Services Project',
          clientName: client?.name || 'Client',
          workDescription: 'Consulting and professional services'
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('AI response:', data)
      
      if (data.items && data.items.length > 0) {
        setFormData({ ...formData, items: data.items })
        console.log('Items updated:', data.items)
      } else {
        console.log('No items returned from AI')
        alert('AI generated no items. Please add items manually.')
      }
    } catch (error) {
      console.error('AI generation failed:', error)
      alert('AI generation failed. Please add items manually.')
    }
    setAiLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createInvoice.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <select
          value={formData.clientId}
          onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        >
          <option value="">Select Client</option>
          {Array.isArray(clients) && clients.map((client: any) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Invoice Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-2">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              className="col-span-2 border rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
              className="border rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
              className="border rounded-md px-3 py-2"
            />
            <input
              type="number"
              value={item.amount}
              readOnly
              className="border rounded-md px-3 py-2 bg-gray-50"
            />
          </div>
        ))}
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={addItem}>
            Add Item
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={generateAIItems}
            disabled={aiLoading || !formData.clientId}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {aiLoading ? 'Generating...' : 'AI Generate'}
          </Button>
        </div>
      </div>

      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full border rounded-md px-3 py-2 h-20"
      />

      <div className="flex gap-2">
        <Button type="submit" disabled={createInvoice.isPending}>
          {createInvoice.isPending ? 'Creating...' : 'Create Invoice'}
        </Button>
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
      </div>
    </form>
  )
}